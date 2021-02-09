import { DB_card, DB_guess, DB_user_room } from '@my-app/interfaces';
import { TReward } from '@my-app/interfaces/parts/schema/TReward';

type Props = { players_list: DB_user_room[]; table_cards: DB_card[]; marks: DB_guess[] };

export const countRewards = ({
  players_list,
  table_cards,
  marks,
}: Props): { rewards: TReward[]; highestScore: number } => {
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

  rewards.forEach((reward) => {
    players_list.forEach((player) => {
      if (player.id === reward.player_id) {
        // eslint-disable-next-line no-param-reassign
        const newScore = +player.score + reward.diff;

        if (highestScore < newScore) {
          highestScore = newScore;
        }
      }
    });
  });

  return { rewards, highestScore };
};
