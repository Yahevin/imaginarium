import { DB_card, DB_guess, DB_user_room, TReward, TScore } from '@imaginarium/packages/interfaces';

type CountRewards = ({
  players_list,
  table_cards,
  marks,
}: {
  players_list: DB_user_room[];
  table_cards: DB_card[];
  marks: DB_guess[];
}) => { scores: TScore[]; rewards: TReward[]; highestScore: number };

export const countRewards: CountRewards = ({ players_list, table_cards, marks }) => {
  const max = marks.length;

  const rewards = table_cards.map((card) => {
    let diff = 0;
    marks.forEach((mark) => {
      if (card?.id === mark.card_id) {
        diff++;
      }
    });
    if (card?.is_main) {
      // eslint-disable-next-line no-magic-numbers
      diff = diff === 0 || diff === max ? (diff = -3) : (diff += 3);
    }
    return {
      player_id: card.player_id,
      diff,
    };
  });
  let highestScore = 0;

  const scores = players_list.map((player) => {
    const newScore = +player.score + rewards.filter((reward) => player.id === reward.player_id)[0].diff;
    if (highestScore < newScore) {
      highestScore = newScore;
    }
    return { player_id: player.id, score: newScore };
  });

  return { scores, rewards, highestScore };
};
