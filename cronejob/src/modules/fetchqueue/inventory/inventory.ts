import { TSupportedGames } from "../fetch/games.type";
import { fetchInventory } from "../fetch/inventory.fech";
import { TResponseInventory } from "./inventory.type";

class Inventory {
  private steamid: string;
  private games: TSupportedGames[];
  private tasks: ((proxy?: string) => Promise<TResponseInventory>)[];

  constructor(games: TSupportedGames[], steamid: string) {
    this.games = games;
    this.steamid = steamid;
    this.tasks = this.calculateTasks();
  }

  private calculateTasks() {
    return this.games.map((game) => {
      return (proxy?: string) => fetchInventory(this.steamid, game, proxy);
    });
  }

  public get getTasks() {
    return this.tasks;
  }
}

export default Inventory;
