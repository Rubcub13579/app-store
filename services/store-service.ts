import { AppModel } from "@/models/app-model";
import axios from "axios";

class StoreService {
  public async getTop10FreeApps(): Promise<AppModel[]> {
    const response = await axios.get(
      "https://rss.marketingtools.apple.com/api/v2/us/apps/top-free/10/apps.json",
    );

    const apps = response.data.feed.results;
    return apps;
  }

  public async getTop25PaidApps(): Promise<AppModel[]> {
    const response = await axios.get(
      "https://rss.marketingtools.apple.com/api/v2/us/apps/top-paid/25/apps.json",
    );

    const apps = response.data.feed.results;
    return apps;
  }
}

export const storeService = new StoreService();
