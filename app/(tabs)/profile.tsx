import { View, Text, StyleSheet, Pressable } from "react-native";
import type { ViewStyle, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../_layout";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const { logout, user } = useAuth(); // user = { name, email, bankAccount }

  // user 정보가 없을 경우 안전 처리
  const name = user?.name ?? "홍길동";
  const email = user?.email ?? "email@example.com";
  const bank = user?.bank ?? "우리";
  const account = user?.account_number ?? "000000000000";

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <LinearGradient
        colors={["#FFE29F", "#FFA99F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerLogo}>BedBet</Text>
        <Ionicons name="menu" size={28} color="#333" />
      </LinearGradient>

      {/* 프로필 카드 */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="person-outline" size={20} color="#555" />
          <Text style={styles.cardText}>{name}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="mail-outline" size={20} color="#555" />
          <Text style={styles.cardText}>{email}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="card-outline" size={20} color="#555" />
          <Text style={styles.cardText}>{bank}</Text>
          <Text style={styles.cardText}>{account}</Text>
        </View>
      </View>

      {/* 로그아웃 */}
      <Pressable onPress={logout} style={styles.item}>
        <Text style={styles.itemText}>로그아웃</Text>
      </Pressable>

      {/* 회원탈퇴 */}
      <Pressable
        onPress={() => {
          // TODO: 회원탈퇴 API 연결
          alert("회원탈퇴 기능은 서버 연결 후 구현됩니다.");
        }}
        style={styles.item}
      >
        <Text style={[styles.itemText, { color: "red" }]}>회원탈퇴</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create<{
  container: ViewStyle;
  header: ViewStyle;
  headerLogo: TextStyle;
  card: ViewStyle;
  row: ViewStyle;
  cardText: TextStyle;
  item: ViewStyle;
  itemText: TextStyle;
}>({
  container: { flex: 1, backgroundColor: "#FFF" },

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLogo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#333",
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  cardText: {
    fontSize: 15,
    color: "#444",
  },

  item: { marginTop: 24, marginLeft: 24 },
  itemText: { fontSize: 16, fontWeight: "500", color: "#111" },
});
