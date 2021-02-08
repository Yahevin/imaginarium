import { DB_card, DB_guess, DB_user_room } from '@my-app/interfaces';

type Props = { players_list: DB_user_room[]; table_cards: DB_card[]; marks: DB_guess[] };

export const countRewards = ({ players_list, table_cards, marks }: Props) => {
  const max = marks.length;

  const rewards = table_cards.map((card) => {
    let score = 0;
    marks.forEach((mark) => {
      if (card?.id === mark.card_id) {
        score++;
      }
    });
    if (card?.is_main) {
      // eslint-disable-next-line no-magic-numbers
      score = score === 0 || score === max ? (score = -3) : (score += 3);
    }
    return {
      player_id: card.player_id,
      score,
    };
  });
  let highestScore = 0;

  rewards.forEach((reward) => {
    players_list.forEach((player) => {
      if (player.id === reward.player_id) {
        // eslint-disable-next-line no-param-reassign
        reward.score = +player.score + reward.score;

        if (highestScore < reward.score) {
          highestScore = reward.score;
        }
      }
    });
  });

  return { rewards, highestScore };
};
