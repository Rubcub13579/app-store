import AppCard from "@/components/app-card";
import { AppModel } from "@/models/app-model";
import { storeService } from "@/services/store-service";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [freeApps, setFreeApps] = useState<AppModel[]>([]);
  const [paidApps, setPaidApps] = useState<AppModel[]>([]);

  useEffect(() => {
    const fetchFreeApps = async () => {
      try {
        const apps = await storeService.getTop10FreeApps();
        setFreeApps(apps);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchPaidApps = async () => {
      try {
        const apps = await storeService.getTop25PaidApps();
        setPaidApps(apps);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPaidApps();
    fetchFreeApps();
  }, []);

  return (
    <View
      style={styles.view}
    >
      <Text style={styles.text}>Top Free Apps</Text>
      <FlatList
        data={freeApps}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AppCard app={item} />}
      />
      <Text style={styles.text}>Top Paid Apps</Text>
      <FlatList
        data={paidApps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AppCard app={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    color: "#fff"
  },
  view: {
    backgroundColor: "#222121",
    flex: 1,
    justifyContent: "center",
  }
})