import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const SELL_PRICE = 100;

export default function WithdrawConfirm() {
  const { coins = "0", cash = "0", balance = "0" } =
    useLocalSearchParams<{ coins: string; cash: string; balance: string }>();

  const c = Number(coins);
  const w = Number(cash);
  const b = Number(balance);
  const fmt = (n: number) => n.toLocaleString("ko-KR");

  const onSubmit = () => {
    // ✔ 유효성: 1개 이상, 보유 코인 이내, 현금 계산 일치
    if (!Number.isInteger(c) || c <= 0 || c > b || w !== c * SELL_PRICE) {
      const reason =
        !Number.isInteger(c) || c <= 0
          ? "출금 코인을 올바르게 입력해 주세요."
          : c > b
          ? "보유 코인보다 많이 출금할 수 없습니다."
          : "금액 계산에 문제가 있습니다.";
      router.replace({ pathname: "/cash/withdraw/fail", params: { reason } });
      return;
    }
    // TODO: 서버 출금 API 호출 위치
    router.replace({ pathname: "/cash/success", params: { kind: "withdraw", amount: cash } });
  };

  return (
    <View style={styles.safe}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>출금</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn} hitSlop={8}>
          <Ionicons name="close" size={24} color="#111" />
        </TouchableOpacity>
      </View>

      {/* 질문 */}
      <Text style={styles.question}>출금하시겠습니까?</Text>

      {/* 카드 (충전 confirm과 동일 레이아웃) */}
      <View style={styles.card}>
        <View style={styles.row}>
          {/* 코인 감소: 빨간 - 아이콘 그대로 */}
          <View style={styles.pill}>
            <Ionicons name="remove-circle-outline" size={18} style={styles.minusIcon} />
            <Text style={[styles.number, styles.minus]}>- {fmt(c)} </Text>
            <Text style={styles.unitSmall}>c</Text>
          </View>

          {/* 현금 증가: 초록 + 를 이미지로 */}
          <View style={styles.pill}>
            <Image
              source={require("../../../assets/icons/cash_active.png")} // app/cash/withdraw/confirm.tsx 기준 경로
              style={styles.cashActiveIcon}
            />
            <Text style={[styles.number, styles.plus]}>+ {fmt(w)}</Text>
            <Text style={styles.unitSmall}> KRW</Text>
          </View>
        </View>

        {/* 보유 코인(부가 설명) */}
        <Text style={styles.balanceText}>보유 코인: {fmt(b)} 개</Text>
      </View>

      {/* 버튼 */}
      <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit} activeOpacity={0.9}>
        <Text style={styles.primaryText}>출금하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // 충전(confirm)과 동일 비율
  safe: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 12 },

  header: { height: 44, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "700", color: "#111" },
  closeBtn: { padding: 4 },

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
  pill: { flexDirection: "row", alignItems: "center", marginHorizontal: 14 },

  number: { fontSize: 18, fontWeight: "800" },
  plus: { color: "#1f8a3a" },
  minus: { color: "#c0392b" },

  cashActiveIcon: { width: 18, height: 18, marginRight: 6, resizeMode: "contain", tintColor: "#1f8a3a" },
  minusIcon: { marginRight: 6, color: "#c0392b" },

  unitSmall: { fontSize: 12, fontWeight: "600", color: "#777", marginLeft: 2 },
  balanceText: { marginTop: 6, fontSize: 11, color: "#9A9A9A", textAlign: "center" },

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
