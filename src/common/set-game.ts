import { default as client } from '../index';


export default function setGame(game: string) {
  client.user.setGame(game);
}
