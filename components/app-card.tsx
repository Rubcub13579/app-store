import { AppModel } from "@/models/app-model";
import { Image, Linking, Pressable, StyleSheet, Text, View, } from "react-native";

type Props = {
  app: AppModel;
};

export default function AppCard({ app }: Props) {
  const openApp = async () => {
    // (optional) validate URL first
    if (app.url) await Linking.openURL(app.url);
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

    // shadow (iOS)
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // elevation (Android)
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
});
