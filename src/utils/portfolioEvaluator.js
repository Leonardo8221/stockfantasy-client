import React, { useState, useEffect } from 'react';

const PortfolioEvaluator = ({ players, stockPrices, evaluationTime, gameEndTime }) => {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvaluations = players.map(player => {
        const portfolioValue = player.stocks.reduce((totalValue, stock) => {
          const stockPrice = stockPrices[stock.symbol][evaluationTime];
          return totalValue + (stockPrice * stock.length);
        }, 0);
        return { playerId: player.id, portfolioValue };
      });
      setEvaluations(prevEvaluations => [...prevEvaluations, newEvaluations]);
    }, 86400000); // 24 hours in milliseconds

    return () => clearInterval(interval);
  }, [players, stockPrices, evaluationTime]);

  useEffect(() => {
    if (Date.now() >= gameEndTime) {
      const winner = evaluations.reduce((currentWinner, evaluation) => {
        if (evaluation.portfolioValue > currentWinner.portfolioValue) {
          return evaluation;
        }
        return currentWinner;
      }, { playerId: null, portfolioValue: 0 });
      console.log(`The winner is player ${winner.playerId} with a portfolio value of ${winner.portfolioValue}`);
    }
  }, [evaluations, gameEndTime]);

  return null;
};

export default PortfolioEvaluator;
