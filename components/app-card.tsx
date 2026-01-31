import { AppModel } from "@/models/app-model";
import { storageService } from "@/services/storage-service";
import { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  app: AppModel;
  onFavoriteChanged?: () => void; // optional: lets Favorites screen refresh
};

export default function AppCard({ app, onFavoriteChanged }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const fav = await storageService.isFavorite(app.id);
      if (alive) setIsFavorite(fav);
    })();
    return () => {
      alive = false;
    };
  }, [app.id]);

  const openApp = async () => {
    if (app.url) await Linking.openURL(app.url);
  };

  const toggleFavorite = async () => {
    const result = await storageService.toggleFavoriteApp(app);
    setIsFavorite(result.isFavorite);
    onFavoriteChanged?.();
  };

  return (
    <Pressable onPress={openApp} style={styles.card}>
      <Image source={{ uri: app.artworkUrl100 }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {app.name}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {app.artistName}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {app.kind} • {app.releaseDate}
        </Text>
      </View>

      {/* Heart button (separate press target) */}
      <Pressable
        onPress={(e) => {
          e.stopPropagation(); // prevents triggering openApp
          toggleFavorite();
        }}
        hitSlop={10}
        style={styles.heartBtn}
      >
        <Text style={[styles.heart, isFavorite && styles.heartActive]}>
          {isFavorite ? "❤" : "🤍"}
        </Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 10,
    marginRight: 10,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  artist: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    opacity: 0.55,
    marginTop: 4,
  },

  heartBtn: {
    paddingLeft: 6,
    paddingVertical: 6,
  },
  heart: {
    fontSize: 22,
    opacity: 0.5,
  },
  heartActive: {
    opacity: 1,
  },
});
