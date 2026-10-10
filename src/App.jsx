import React, { useState, useCallback, useEffect, useRef } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import Lobby from './components/Lobby';
import HUD from './components/HUD';
import PlayerHand from './components/PlayerHand';
import QuestionModal from './components/QuestionModal';
import SpecialActionModal from './components/SpecialActionModal';
import SummaryModal from './components/SummaryModal';
import { createDeck, canPlayCard, getNextPlayerIndex, CARD_COLORS } from './gameLogic';
import { getRandomQuestion } from './questionsData';
import { sounds } from './sound';

export default function App() {
  const [gameState, setGameState] = useState('lobby'); // 'lobby' | 'playing' | 'gameover'
  const [players, setPlayers] = useState([]);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = clockwise, -1 = counter-clockwise
  const [, setDeck] = useState([]);
  const [topCard, setTopCard] = useState(null);
  const [activeChosenColor, setActiveChosenColor] = useState(null);
  const [wellBeingScore, setWellBeingScore] = useState(0);
  const [reflections, setReflections] = useState([]);
  const [winner, setWinner] = useState(null);

  // 3D Visual trigger state
  const [lastAction, setLastAction] = useState(null);

  // Active interaction modals
  const [pendingQuestion, setPendingQuestion] = useState(null);
  const [pendingSpecialAction, setPendingSpecialAction] = useState(null);
  const [isBotMode, setIsBotMode] = useState(false);

  // Start Game from Lobby
  const handleStartGame = (playerNames, botMode = false) => {
    sounds.init();
    if (!sounds.muted && !sounds.bgmPlaying) {
      sounds.startBGM();
    }

    const fullDeck = createDeck();
    const initialHandSize = 5;

    // Deal cards
    const initialPlayers = playerNames.map((name, i) => {
      const hand = fullDeck.splice(0, initialHandSize);
      return { id: `p_${i}`, name, hand };
    });

    // Pick starting card (must be a number card for clean start)
    let startIndex = fullDeck.findIndex((c) => c.type === 'number');
    if (startIndex === -1) startIndex = 0;
    const initialTop = fullDeck.splice(startIndex, 1)[0];

    setIsBotMode(botMode);
    setPlayers(initialPlayers);
    setDeck(fullDeck);
    setTopCard(initialTop);
    setActiveChosenColor(null);
    setActivePlayerIndex(0);
    setDirection(1);
    setWellBeingScore(0);
    setReflections([]);
    setWinner(null);
    setLastAction(null);
    setPendingQuestion(null);
    setPendingSpecialAction(null);
    setGameState('playing');
  };

  // Helper to draw N cards for a specific player
  const drawCardsForPlayer = useCallback(
    (playerIdx, count = 1) => {
      setDeck((prevDeck) => {
        let currentDeck = [...prevDeck];
        if (currentDeck.length < count) {
          // Re-generate fresh deck if exhausted
          currentDeck = [...currentDeck, ...createDeck()];
        }
        const drawn = currentDeck.splice(0, count);

        setPlayers((prevPlayers) => {
          const updated = [...prevPlayers];
          if (!updated[playerIdx]) return prevPlayers;
          const targetPlayer = { ...updated[playerIdx] };
          targetPlayer.hand = [...(targetPlayer.hand || []), ...drawn];
          updated[playerIdx] = targetPlayer;
          return updated;
        });

        return currentDeck;
      });
    },
    []
  );

  // Draw card by active player on their turn
  const handleDrawCard = () => {
    if (pendingQuestion || pendingSpecialAction) return;
    if (!players || players.length === 0) return;

    sounds.playDraw();
    setLastAction({
      type: 'draw',
      toPlayerIndex: activePlayerIndex,
    });

    drawCardsForPlayer(activePlayerIndex, 1);

    // Pass turn to next player
    const nextIdx = getNextPlayerIndex(activePlayerIndex, players.length, direction, 1);
    setActivePlayerIndex(nextIdx);
  };

  // Play a card from hand
  const handlePlayCard = (card, cardIndex) => {
    if (pendingQuestion || pendingSpecialAction) return;

    const currentPlayer = players[activePlayerIndex];
    if (!currentPlayer || !currentPlayer.hand) return;
    const newHand = currentPlayer.hand.filter((_, idx) => idx !== cardIndex);

    // Update player hand & top card
    setPlayers((prev) => {
      const updated = [...prev];
      updated[activePlayerIndex] = { ...currentPlayer, hand: newHand };
      return updated;
    });
    setTopCard(card);

    if (card.color !== 'wild') {
      setActiveChosenColor(null);
    }

    // Trigger 3D throw animation
    setLastAction({
      type: 'play',
      fromPlayerIndex: activePlayerIndex,
      card,
    });

    // Check special action requirement
    if (card.type === 'draw2') {
      // +2 allows free targeting of any classmate
      const otherPlayers = players
        .map((p, idx) => ({ index: idx, name: p.name, count: p.hand?.length || 0 }))
        .filter((p) => p.index !== activePlayerIndex);

      setPendingSpecialAction({
        type: 'targetDraw2',
        card,
        remainingHand: newHand,
        otherPlayers,
        nextStep: 1,
      });
    } else if (card.type === 'wild' || card.type === 'wild4') {
      // Wild requires choosing dimension color
      setPendingSpecialAction({
        type: 'chooseColor',
        card,
        remainingHand: newHand,
        isWild4: card.type === 'wild4',
      });
    } else if (card.type === 'reverse') {
      sounds.playReverse();
      const newDir = direction * -1;
      setDirection(newDir);
      triggerQuestionModal(card, currentPlayer, newHand, newDir, 1);
    } else if (card.type === 'skip') {
      sounds.playReverse();
      // Skip next player (step = 2)
      triggerQuestionModal(card, currentPlayer, newHand, direction, 2);
    } else {
      // Normal number card
      triggerQuestionModal(card, currentPlayer, newHand, direction, 1);
    }
  };

  // Trigger Question Modal for the dimension
  const triggerQuestionModal = (card, player, remainingHand, currentDir, step = 1, overrideColor = null) => {
    let dimKey = overrideColor || (card?.color !== 'wild' ? card?.color : activeChosenColor) || 'being';
    if (!CARD_COLORS.includes(dimKey)) {
      dimKey = 'being';
    }

    const q = getRandomQuestion(dimKey);
    setPendingQuestion({
      player,
      dimensionKey: dimKey,
      questionData: q,
      remainingHand: remainingHand || [],
      currentDir: currentDir || direction,
      step: step || 1,
    });
  };

  // Callback when +2 Target is picked
  const handleSelectPlusTwoTarget = (targetIdx) => {
    if (!pendingSpecialAction) return;
    const card = pendingSpecialAction.card;
    const currentPlayer = players[activePlayerIndex];
    if (!currentPlayer) return;
    const remainingHand = pendingSpecialAction.remainingHand || [];

    // Throw +2 to target in 3D
    setLastAction({
      type: 'plusTwo',
      fromPlayerIndex: activePlayerIndex,
      toPlayerIndex: targetIdx,
      card,
    });

    drawCardsForPlayer(targetIdx, 2);
    setPendingSpecialAction(null);

    // Proceed to dimension reflection
    triggerQuestionModal(card, currentPlayer, remainingHand, direction, 1);
  };

  // Callback when Wild Color is picked
  const handleSelectWildColor = (chosenColor) => {
    if (!pendingSpecialAction) return;
    const card = pendingSpecialAction.card;
    const isWild4 = pendingSpecialAction.isWild4;
    const currentPlayer = players[activePlayerIndex];
    if (!currentPlayer) return;
    const remainingHand = pendingSpecialAction.remainingHand || [];

    setActiveChosenColor(chosenColor);
    setPendingSpecialAction(null);

    if (isWild4) {
      // Next player draws 4 cards
      const nextPlayerIdx = getNextPlayerIndex(activePlayerIndex, players.length, direction, 1);
      drawCardsForPlayer(nextPlayerIdx, 4);
      setLastAction({
        type: 'plusTwo',
        fromPlayerIndex: activePlayerIndex,
        toPlayerIndex: nextPlayerIdx,
        card,
      });
      triggerQuestionModal(card, currentPlayer, remainingHand, direction, 2, chosenColor);
    } else {
      triggerQuestionModal(card, currentPlayer, remainingHand, direction, 1, chosenColor);
    }
  };

  // Callback when Player completes Question Modal
  const handleCompleteReflection = (reflectionRecord) => {
    if (!pendingQuestion) return;
    const { player, remainingHand = [], currentDir = direction, step = 1 } = pendingQuestion;
    if (!player) {
      setPendingQuestion(null);
      return;
    }

    // Record reflection
    const updatedReflections = [...reflections, reflectionRecord];
    setReflections(updatedReflections);

    // Increase Team Well-being Meter (+10% per story)
    const newScore = Math.min(100, wellBeingScore + 10);
    setWellBeingScore(newScore);

    setPendingQuestion(null);

    // Check End Game conditions:
    // Game HANYA selesai ketika ada pemain yang kartunya habis (remainingHand.length === 0)
    // Skor Well-being tetap bertambah sebagai capaian tim, tetapi tidak mengakhiri game
    if (remainingHand && remainingHand.length === 0) {
      setWinner(player);
      setGameState('gameover');
      return;
    }

    // Advance turn
    const nextIdx = getNextPlayerIndex(activePlayerIndex, players.length, currentDir, step);
    setActivePlayerIndex(nextIdx);
  };

  const actionsRef = useRef({});
  useEffect(() => {
    actionsRef.current = {
      handleCompleteReflection,
      handleSelectPlusTwoTarget,
      handleSelectWildColor,
      handlePlayCard,
      handleDrawCard,
    };
  });

  // Bot Auto-Play Turn (Runs when Solo Bot Mode is active and it's a computer player's turn)
  useEffect(() => {
    if (!isBotMode || gameState !== 'playing' || activePlayerIndex === 0) return;

    // Handle bot question reflection
    if (pendingQuestion && pendingQuestion.player?.id !== 'p_0') {
      const timer = setTimeout(() => {
        const options = pendingQuestion.questionData?.options || [];
        const chosen = options[Math.floor(Math.random() * options.length)] || options[0];
        actionsRef.current.handleCompleteReflection({
          playerName: pendingQuestion.player.name,
          dimension: pendingQuestion.dimensionKey,
          question: pendingQuestion.questionData.question,
          answer: chosen?.text || 'Semangat dan senang bermain bersama!',
          recoveryAction: chosen?.type === 'recovery' ? 'Minum air dan tarik napas dalam' : null,
          isSafePass: false,
        });
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Handle bot special action choice
    if (pendingSpecialAction) {
      const timer = setTimeout(() => {
        if (pendingSpecialAction.type === 'chooseColor') {
          actionsRef.current.handleSelectWildColor(CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)]);
        } else if (pendingSpecialAction.type === 'targetDraw2') {
          actionsRef.current.handleSelectPlusTwoTarget(0); // Target player 0 (user)
        }
      }, 1200);
      return () => clearTimeout(timer);
    }

    // Handle bot card play or draw
    if (!pendingQuestion && !pendingSpecialAction) {
      const timer = setTimeout(() => {
        const botPlayer = players[activePlayerIndex];
        if (!botPlayer) return;

        const playableIndices = [];
        botPlayer.hand.forEach((card, idx) => {
          if (canPlayCard(card, topCard, activeChosenColor)) {
            playableIndices.push(idx);
          }
        });

        if (playableIndices.length > 0) {
          const chosenIdx = playableIndices[Math.floor(Math.random() * playableIndices.length)];
          actionsRef.current.handlePlayCard(botPlayer.hand[chosenIdx], chosenIdx);
        } else {
          actionsRef.current.handleDrawCard();
        }
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [
    isBotMode,
    gameState,
    activePlayerIndex,
    pendingQuestion,
    pendingSpecialAction,
    players,
    topCard,
    activeChosenColor,
  ]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans select-none">
      
      {/* 3D WebGL Canvas Layer */}
      <ThreeCanvas
        players={players}
        activePlayerIndex={activePlayerIndex}
        direction={direction}
        topCard={topCard}
        lastAction={lastAction}
        onDrawDeckClick={handleDrawCard}
        isLobby={gameState === 'lobby'}
      />

      {/* Lobby Screen */}
      {gameState === 'lobby' && <Lobby onStartGame={handleStartGame} />}

      {/* Main Game Interface */}
      {gameState === 'playing' && (
        <>
          <HUD
            players={players}
            activePlayerIndex={activePlayerIndex}
            direction={direction}
            wellBeingScore={wellBeingScore}
            onResetToLobby={() => setGameState('lobby')}
          />

          {/* Central Table Quick Indicator */}
          {topCard && (
            <div className="absolute top-16 sm:top-20 right-4 z-20 flex flex-col items-end gap-2 pointer-events-none">
              <div className="pointer-events-auto bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2.5 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kartu Aktif</div>
                  <div className="text-xs font-bold text-white capitalize">{topCard.type !== 'number' ? topCard.type : `Nomor ${topCard.value}`}</div>
                  {activeChosenColor && (
                    <div className="text-[10px] font-bold text-amber-300">Tema: {activeChosenColor.toUpperCase()}</div>
                  )}
                </div>
                {/* Visual miniature of top card */}
                <div
                  className={`w-11 h-16 rounded-xl border-2 flex flex-col items-center justify-between p-1 font-fredoka font-black text-sm shadow-md ${
                    (activeChosenColor || topCard.color) === 'health'
                      ? 'bg-red-600 border-red-300 text-white'
                      : (activeChosenColor || topCard.color) === 'having'
                      ? 'bg-amber-500 border-amber-200 text-slate-950'
                      : (activeChosenColor || topCard.color) === 'loving'
                      ? 'bg-emerald-600 border-emerald-300 text-white'
                      : (activeChosenColor || topCard.color) === 'being'
                      ? 'bg-blue-600 border-blue-300 text-white'
                      : 'bg-indigo-900 border-amber-400 text-white'
                  }`}
                >
                  <span className="text-[9px] leading-none">{topCard.value}</span>
                  <span className="text-xs leading-none">{topCard.value}</span>
                  <span className="text-[8px] leading-none opacity-80">
                    {(activeChosenColor || topCard.color).slice(0, 3).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <PlayerHand
            players={players}
            activePlayerIndex={activePlayerIndex}
            topCard={topCard}
            activeChosenColor={activeChosenColor}
            onPlayCard={handlePlayCard}
            onDrawCard={handleDrawCard}
            disabled={Boolean(pendingQuestion || pendingSpecialAction || (isBotMode && activePlayerIndex !== 0))}
            isBotTurn={Boolean(isBotMode && activePlayerIndex !== 0)}
          />

          {/* Interactive Question Reflection Modal */}
          {pendingQuestion && (
            <QuestionModal
              player={pendingQuestion.player}
              dimensionKey={pendingQuestion.dimensionKey}
              questionData={pendingQuestion.questionData}
              onCompleteReflection={handleCompleteReflection}
            />
          )}

          {/* Special Action Modals (+2 Target or Wild Color) */}
          {pendingSpecialAction && (
            <SpecialActionModal
              type={pendingSpecialAction.type}
              activePlayer={players[activePlayerIndex]}
              otherPlayers={pendingSpecialAction.otherPlayers}
              onSelectTarget={handleSelectPlusTwoTarget}
              onSelectColor={handleSelectWildColor}
            />
          )}
        </>
      )}

      {/* End Game Summary Report */}
      {gameState === 'gameover' && (
        <SummaryModal
          players={players}
          winner={winner}
          reflections={reflections}
          wellBeingScore={wellBeingScore}
          onPlayAgain={() => setGameState('lobby')}
        />
      )}

    </div>
  );
}
