import { AppModel } from "@/models/app-model";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  freeApps: "freeApps",
  paidApps: "paidApps",
  favorites: "favoriteApps",
} as const;

class StorageService {
  public async saveFreeApps(apps: AppModel[]) {
    await AsyncStorage.setItem(KEYS.freeApps, JSON.stringify(apps));
  }

  public async savePaidApps(apps: AppModel[]) {
    await AsyncStorage.setItem(KEYS.paidApps, JSON.stringify(apps));
  }

  public async loadFreeApps(): Promise<AppModel[]> {
    const cached = await AsyncStorage.getItem(KEYS.freeApps);
    return cached ? JSON.parse(cached) : [];
  }

  public async loadPaidApps(): Promise<AppModel[]> {
    const cached = await AsyncStorage.getItem(KEYS.paidApps);
    return cached ? JSON.parse(cached) : [];
  }

  public async loadFavoriteApps(): Promise<AppModel[]> {
    const cached = await AsyncStorage.getItem(KEYS.favorites);
    const parsed = cached ? JSON.parse(cached) : [];
    return Array.isArray(parsed) ? parsed : []; // protects you from old "single object" saves
  }

  public async addFavoriteApp(app: AppModel): Promise<AppModel[]> {
    const favorites = await this.loadFavoriteApps();
    const exists = favorites.some((a) => a.id === app.id);
    if (exists) return favorites;

    const next = [app, ...favorites];
    await AsyncStorage.setItem(KEYS.favorites, JSON.stringify(next));
    return next;
  }

  public async removeFavoriteApp(appId: string): Promise<AppModel[]> {
    const favorites = await this.loadFavoriteApps();
    const next = favorites.filter((a) => a.id !== appId);
    await AsyncStorage.setItem(KEYS.favorites, JSON.stringify(next));
    return next;
  }

  public async toggleFavoriteApp(
    app: AppModel,
  ): Promise<{ isFavorite: boolean; favorites: AppModel[] }> {
    const favorites = await this.loadFavoriteApps();
    const exists = favorites.some((a) => a.id === app.id);

    const next = exists
      ? favorites.filter((a) => a.id !== app.id)
      : [app, ...favorites];
    await AsyncStorage.setItem(KEYS.favorites, JSON.stringify(next));

    return { isFavorite: !exists, favorites: next };
  }

  public async isFavorite(appId: string): Promise<boolean> {
    const favorites = await this.loadFavoriteApps();
    return favorites.some((a) => a.id === appId);
  }
}

export const storageService = new StorageService();
