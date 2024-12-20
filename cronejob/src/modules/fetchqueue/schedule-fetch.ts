import Inventory from "./inventory/inventory";
import { TResponseInventory } from "./inventory/inventory.type";
import { TSupportedGames } from "./fetch/games.type";
import ProxyManager from "./proxy/praxy-manager";
import Market from "./market/market";

class ScheduleFetch {
  private proxies: string[] | string;
  private inventories: Inventory[] = [];
  private proxyManager: ProxyManager;
  private fetchedInventories: TResponseInventory[] = [];
  private delay: number;

  constructor(proxies: string[] | string | undefined, delay: number) {
    this.delay = delay;
    this.proxies = Array.isArray(proxies) ? proxies : proxies ? [proxies] : [];
    this.proxyManager = new ProxyManager(this.proxies, delay);
  }

  public addProfile(steamId: string, games: TSupportedGames[]) {
    const inventory = new Inventory(games, steamId);
    this.inventories.push(inventory);
  }

  public async fetchAllInventories() {
    const tasks: ((proxy?: string) => Promise<TResponseInventory>)[] = [];
    this.inventories.forEach((inventory) => {
      tasks.push(...inventory.getTasks);
    });
    const allInventories = await this.proxyManager.executeRequestsInBatches(
      tasks
    );
    this.fetchedInventories = allInventories;
  }

  public async fetchAllPrices() {
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    console.log("FETCHING PRICES");
    const marketPrices = new Market(this.fetchedInventories);
    const allPrices = await this.proxyManager.executeRequestsInBatches(
      marketPrices.getTasks
    );

    this.fetchedInventories = this.fetchedInventories.map((inventory) => {
      return {
        ...inventory,
        inventory: inventory.inventory.map((item) => {
          const priceData = allPrices.find(
            (price) => price.hash_name === item.market_hash_name
          );
          if (priceData) {
            return {
              ...item,
              price: priceData.price,
              median: priceData.median,
              sold_today: priceData.sold_today,
            };
          }
          return item;
        }),
      };
    });
  }

  public get getFetchedInventories() {
    return this.fetchedInventories;
  }
}

export default ScheduleFetch;
