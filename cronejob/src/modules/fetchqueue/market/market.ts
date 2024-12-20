import { TSupportedGames } from "../fetch/games.type";
import { fetchItemPrice } from "../fetch/market.fetch";
import { TResponseMarketPrice } from "../fetch/market.type";
import { TResponseInventory } from "../inventory/inventory.type";

type TNameWithGame = {
  name: string;
  game: TSupportedGames;
};

class Market {
  private namesWithGame: TNameWithGame[];
  private tasks: ((proxy?: string) => Promise<TResponseMarketPrice>)[];

  public constructor(inventories: TResponseInventory[]) {
    this.namesWithGame = this.getMarketableItems(inventories);
    this.tasks = this.calculateTasks();
  }

  private getMarketableItems(inventories: TResponseInventory[]) {
    const martketable: TNameWithGame[] = inventories.flatMap((inventory) => {
      return inventory.inventory
        .filter(
          (invDetails) =>
            invDetails.marketable !== 0 ||
            invDetails.market_marketable_restriction !== 0
        )
        .map((invDetails) => ({
          name: invDetails.name,
          game: inventory.game,
        }));
    });
    console.log(`DEFINED ${martketable.length} ITEMS TO PRASE PRICE`);
    return martketable;
  }

  private calculateTasks() {
    return this.namesWithGame.map((nameWithGame) => {
      return (proxy?: string) =>
        fetchItemPrice(nameWithGame.name, nameWithGame.game, proxy);
    });
  }

  public get getTasks() {
    return this.tasks;
  }
}

export default Market;
