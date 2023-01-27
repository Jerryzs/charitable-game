import React from "react";
import { Line } from "rc-progress";
import "./Information.css";
import Player from "../interfaces/Player";
import exp from "../libraries/Exp";
import Item from "../interfaces/Item";

const Information = ({
  player, xp, energy, items
}: {
  player: Player
  xp: number
  energy: number
  items: Item[]
}) => {
  const _items = [...items]

  ;(() => {
    let index = (() => {
      let index = 0
      for (let i = 0; i < _items.length; i++) {
        if (_items[i].id === 2) index = i
        if (_items[i].id === 3) return index
      }
      return -1
    })()

    if (index !== -1) _items.splice(index, 1)
  })()

  return (
    <div className="information">
      <ul>
        <li style={{ marginBottom: '1em' }}>
          <h5>{player.name}</h5>
          <h5>Lvl {exp(xp).toLvl()}</h5>
        </li>
        <li>
          <h5>Experience</h5>
          <Line percent={exp(xp).ratio() * 100} strokeWidth={4} strokeColor="#33d6ff" />
        </li>
        <li>
          <h5>Energy</h5>
          <Line percent={energy} strokeWidth={4} strokeColor="#00e600" />
        </li>
      </ul>
      <h5>Inventory</h5>
      <div className="items">
        {
          _items.map((item) => (
            <div key={item.id} style={{ backgroundImage: `url(${item.image})`}} />
          ))
        }
      </div>
    </div>
  );
};

export default Information;
