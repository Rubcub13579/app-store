import AppCard from "@/components/app-card";
import { AppModel } from "@/models/app-model";
import { storageService } from "@/services/storage-service";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Favorites() {
  const [favoriteApps, setFavoriteApps] = useState<AppModel[]>([]);

  const load = useCallback(() => {
    let alive = true;

    (async () => {
      try {
        const apps = await storageService.loadFavoriteApps();
        if (alive) setFavoriteApps(apps);
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  useFocusEffect(load);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: "700", padding: 12 }}>
        Favorite Apps
      </Text>

      <FlatList
        data={favoriteApps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AppCard app={item} />}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 12 }}
        ListEmptyComponent={
          <Text style={{ opacity: 0.6, padding: 12 }}>No favorites yet.</Text>
        }
      />
    </View>
  );
}
