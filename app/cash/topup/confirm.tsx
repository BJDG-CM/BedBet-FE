import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Image } from "react-native";

const BUY_PRICE = 110;

export default function TopupConfirm() {
  const { coins = "0", cash = "0" } = useLocalSearchParams<{ coins: string; cash: string }>();
  const c = Number(coins);
  const w = Number(cash);

  const fmt = (n: number) => n.toLocaleString("ko-KR");

  const onSubmit = () => {
    // ✔ 유효성 검사: 1개 이상, 현금 계산 일치
    if (!Number.isInteger(c) || c <= 0 || w !== c * BUY_PRICE) {
      router.replace({ pathname: "/cash/topup/fail", params: { reason: "충전 수량이 올바르지 않습니다." } });
      return;
    }
    // TODO: 서버 결제/입금 확인 API 호출 위치
    router.replace({ pathname: "/cash/success", params: { kind: "topup", amount: coins } });
  };

  return (
    <View style={styles.safe}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.title}>충전</Text>
        {/* 우측 공간 채우기(타이틀 가운데 정렬 보정) */}
        <View style={styles.headerBtn} />
      </View>

      {/* 질문 */}
      <Text style={styles.question}>충전하시겠습니까?</Text>

      {/* 카드 */}
      <View style={styles.card}>
        <View style={styles.row}>
          {/* 코인 + 표시 */}
          <View style={styles.pill}>
            <Image
              source={require("../../../assets/icons/cash_active.png")}
              style={styles.cashActiveIcon}
            />
            <Text style={[styles.number, styles.plus]}>+ {fmt(c)} </Text>
            <Text style={styles.unitSmall}>c</Text>
          </View>

          {/* 현금 - 표시 */}
          <View style={styles.pill}>
            <Ionicons name="remove-circle-outline" size={18} style={styles.minusIcon} />
            <Text style={[styles.number, styles.minus]}>- {fmt(w)}</Text>
            <Text style={styles.unitSmall}> KRW</Text>
          </View>
        </View>

        {/* 계좌(작게) */}
        <Text style={styles.bank}>우리 110011001100</Text>
      </View>

      {/* 기본 버튼 */}
      <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit} activeOpacity={0.9}>
        <Text style={styles.primaryText}>충전하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 12 },

  header: { height: 44, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 16, fontWeight: "700" },

  question: { marginTop: 8, marginBottom: 12, fontSize: 13, color: "#222", textAlign: "center" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EFE7D6",
  },

  row: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 8 },

  pill: { flexDirection: "row", alignItems: "center", marginHorizontal: 14, },

  number: { fontSize: 18, fontWeight: "800" },
  plus: { color: "#1f8a3a" },
  minus: { color: "#c0392b" },

  plusIcon: { marginRight: 6, color: "#1f8a3a" },
  minusIcon: { marginRight: 6, color: "#c0392b" },

  unitSmall: { fontSize: 12, fontWeight: "600", color: "#777", marginLeft: 2 },

  bank: { marginTop: 6, fontSize: 11, color: "#9A9A9A", textAlign: "center" },

  cashActiveIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
    resizeMode: "contain",
  },

  primaryBtn: {
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F6D486",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    alignSelf: "center",
    width: "88%",
  },
  primaryText: { fontSize: 14, fontWeight: "800", color: "#3a2c05" },
});
