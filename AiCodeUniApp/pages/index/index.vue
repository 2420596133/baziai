<template>
  <view class="container">
    <view class="form-card">
      <text class="form-title">请输入出生日期</text>

      <view class="form-item">
        <text class="label">年份</text>
        <picker
          mode="selector"
          :range="yearRange"
          :range-key="'label'"
          :value="yearIndex"
          @change="onYearChange"
        >
          <view class="picker">{{ selectedYear.label }}</view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">月份</text>
        <picker
          mode="selector"
          :range="monthRange"
          :range-key="'label'"
          :value="monthIndex"
          @change="onMonthChange"
        >
          <view class="picker">{{ selectedMonth.label }}</view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">日期</text>
        <picker
          mode="selector"
          :range="dayRange"
          :range-key="'label'"
          :value="dayIndex"
          @change="onDayChange"
        >
          <view class="picker">{{ selectedDay.label }}</view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">时辰</text>
        <picker
          mode="selector"
          :range="hourRange"
          :range-key="'label'"
          :value="hourIndex"
          @change="onHourChange"
        >
          <view class="picker">{{ selectedHour.label }}</view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">性别</text>
        <picker
          mode="selector"
          :range="genderRange"
          :range-key="'label'"
          :value="genderIndex"
          @change="onGenderChange"
        >
          <view class="picker">{{ selectedGender.label }}</view>
        </picker>
      </view>

      <view class="form-item" style="margin-top: 30rpx">
        <text class="label">公历/农历</text>
        <picker
          mode="selector"
          :range="calendarRange"
          :range-key="'label'"
          :value="calendarIndex"
          @change="onCalendarChange"
        >
          <view class="picker">{{ selectedCalendar.label }}</view>
        </picker>
      </view>

      <button
        class="calc-btn"
        @click="calculate"
        :loading="loading"
      >
        {{ loading ? '计算中...' : '开始排盘' }}
      </button>
    </view>

    <view v-if="result" class="result-card">
      <text class="result-title">排盘结果</text>

      <view class="result-row">
        <text class="result-label">出生日期</text>
        <text class="result-value">{{ birthText }}</text>
      </view>

      <view class="result-row">
        <text class="result-label">生辰八字</text>
        <text class="result-value">{{ result.baziText }}</text>
      </view>

      <view class="result-row">
        <text class="result-label">生肖</text>
        <text class="result-value">{{ result.zodiac }}</text>
      </view>

      <view class="result-row">
        <text class="result-label">五行</text>
        <text class="result-value">{{ result.wuxing }}</text>
      </view>

      <view class="eight-char-table">
        <view
          class="palace"
          v-for="(palace, idx) in result.palaces"
          :key="idx"
        >
          <text class="gan">{{ palace.gan }}</text>
          <text class="zhi">{{ palace.zhi }}</text>
        </view>
      </view>
    </view>

    <view class="disclaimer">
      八字智能解读，仅供娱乐参考
    </view>
  </view>
</template>

<script>
import { api } from "../../utils/api";

export default {
  data() {
    return {
      loading: false,
      result: null,

      // 年份
      yearRange: [],
      yearIndex: 50,
      // 月份
      monthRange: [],
      monthIndex: 0,
      // 日期
      dayRange: [],
      dayIndex: 0,
      // 时辰
      hourRange: [],
      hourIndex: 0,
      // 性别
      genderIndex: 0,
      // 日历类型
      calendarIndex: 0,
    };
  },

  computed: {
    selectedYear() {
      return this.yearRange[this.yearIndex] || { label: "1990" };
    },
    selectedMonth() {
      return this.monthRange[this.monthIndex] || { label: "1月" };
    },
    selectedDay() {
      return this.dayRange[this.dayIndex] || { label: "1日" };
    },
    selectedHour() {
      return this.hourRange[this.hourIndex] || { label: "子时(23-1)" };
    },
    selectedGender() {
      return this.genderRange[this.genderIndex];
    },
    selectedCalendar() {
      return this.calendarRange[this.calendarIndex];
    },

    genderRange() {
      return [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
      ];
    },
    calendarRange() {
      return [
        { label: "公历", value: "solar" },
        { label: "农历", value: "lunar" },
      ];
    },

    birthText() {
      const y = this.selectedYear.value;
      const m = this.selectedMonth.value + 1;
      const d = this.selectedDay.value + 1;
      const c = this.selectedCalendar.label;
      return `${c} ${y}年${m}月${d}日 ${this.selectedHour.label}`;
    },
  },

  onLoad() {
    this.initYearRange();
    this.initMonthRange();
    this.initDayRange();
    this.initHourRange();
  },

  methods: {
    initYearRange() {
      const start = 1900;
      const end = new Date().getFullYear();
      this.yearRange = Array.from({ length: end - start + 1 }, (_, i) => ({
        label: String(start + i),
        value: start + i,
      }));
      this.yearIndex = Math.floor(this.yearRange.length / 2);
    },

    initMonthRange() {
      this.monthRange = Array.from({ length: 12 }, (_, i) => ({
        label: `${i + 1}月`,
        value: i,
      }));
    },

    initDayRange() {
      const max = 31;
      this.dayRange = Array.from({ length: max }, (_, i) => ({
        label: `${i + 1}日`,
        value: i,
      }));
    },

    initHourRange() {
      this.hourRange = [
        { label: "子时(23-1)", value: 23 },
        { label: "丑时(1-3)", value: 1 },
        { label: "寅时(3-5)", value: 3 },
        { label: "卯时(5-7)", value: 5 },
        { label: "辰时(7-9)", value: 7 },
        { label: "巳时(9-11)", value: 9 },
        { label: "午时(11-13)", value: 11 },
        { label: "未时(13-15)", value: 13 },
        { label: "申时(15-17)", value: 15 },
        { label: "酉时(17-19)", value: 17 },
        { label: "戌时(19-21)", value: 19 },
        { label: "亥时(21-23)", value: 21 },
      ];
    },

    onYearChange(e) {
      this.yearIndex = e.detail.value;
    },
    onMonthChange(e) {
      this.monthIndex = e.detail.value;
    },
    onDayChange(e) {
      this.dayIndex = e.detail.value;
    },
    onHourChange(e) {
      this.hourIndex = e.detail.value;
    },
    onGenderChange(e) {
      this.genderIndex = e.detail.value;
    },
    onCalendarChange(e) {
      this.calendarIndex = e.detail.value;
    },

    async calculate() {
      const data = {
        year: this.selectedYear.value,
        month: this.selectedMonth.value + 1,
        day: this.selectedDay.value + 1,
        hour: this.selectedHour.value,
        isSolar: this.selectedCalendar.value === "solar",
        gender: this.selectedGender.value === "male" ? 1 : 0,
      };

      this.loading = true;
      try {
        const res = await api.bazi.calculate(data);
        if (res.code === "200" && res.data) {
          this.result = this.formatResult(res.data);
        } else {
          uni.showToast({
            title: res.msg || "计算失败，请重试",
            icon: "none",
          });
        }
      } catch (e) {
        uni.showToast({ title: String(e), icon: "none" });
      } finally {
        this.loading = false;
      }
    },

    formatResult(data) {
      // 根据后端返回格式适配，这里假设后端返回结构
      return {
        baziText: (data.ganzhi || []).join(" "),
        zodiac: data.zodiac || "",
        wuxing: data.wuxingText || "",
        palaces: this.formatPalaces(data),
      };
    },

    formatPalaces(data) {
      // 年月日时四柱，每个放天干地支
      const gz = data.ganzhi || [];
      if (gz.length === 4) {
        return gz.map((item) => {
          const [gan, zhi] = item.split("");
          return { gan: gan || "", zhi: zhi || "" };
        });
      }
      return [];
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding: 20rpx;
  background-color: #f7f7f7;
}
.form-card {
  background: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
}
.form-title {
  display: block;
  font-size: 32rpx;
  font-weight: 500;
  margin-bottom: 30rpx;
  text-align: center;
}
.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}
.label {
  font-size: 28rpx;
  color: #333;
}
.picker {
  font-size: 28rpx;
  color: #333;
  padding: 10rpx 20rpx;
}
.calc-btn {
  margin-top: 40rpx;
  background-color: #007aff;
  color: #fff;
  border-radius: 8rpx;
}
.result-card {
  background: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
}
.result-title {
  display: block;
  font-size: 32rpx;
  font-weight: 500;
  margin-bottom: 25rpx;
}
.result-row {
  display: flex;
  justify-content: space-between;
  padding: 15rpx 0;
}
.result-label {
  font-size: 28rpx;
  color: #666;
}
.result-value {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}
.eight-char-table {
  margin-top: 30rpx;
  display: flex;
  flex-direction: column;
  gap: 15rpx;
}
.palace {
  display: flex;
  padding: 20rpx;
  background: #f5f5f5;
  border-radius: 8rpx;
  justify-content: space-around;
}
.gan {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  width: 100rpx;
}
.zhi {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  width: 100rpx;
}
.disclaimer {
  margin-top: 30rpx;
  text-align: center;
  font-size: 24rpx;
  color: #999;
}
</style>
