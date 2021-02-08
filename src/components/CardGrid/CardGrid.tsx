import React, { useState } from 'react';

import { Modal } from '@/components/Modal/Modal';
import { CardImg, CardWrap, Grid, Grid__Item } from './CardGrid.styles';
import { TCardGrid } from './CardGrid.model';

export const CardGrid: React.FC<TCardGrid> = ({ cards, setSelect, selected_id }) => {
  const [preview, setPreview] = useState<null | { id: number; img: string }>(null);

  return (
    <Grid>
      {cards.map((card) => {
        const selected = selected_id === card.id;

        return (
          <Grid__Item isActive={selected} key={card.id}>
            <CardImg
              src={card.img_url}
              onClick={() => {
                setPreview({ id: card.id, img: card.img_url });
              }}
              alt="card"
            />
          </Grid__Item>
        );
      })}
      {preview && (
        <Modal
          isOpen={preview !== null}
          close={() => {
            setPreview(null);
          }}
        >
          <CardWrap>
            <CardImg
              src={preview?.img}
              alt="preview"
              onClick={() => {
                setSelect(preview?.id);
                setPreview(null);
              }}
            />
          </CardWrap>
        </Modal>
      )}
    </Grid>
  );
};
