<script setup lang="ts">
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useAttendance } from '../composables/useAttendance';
// import { useAuthStore } from '../stores/auth'
// const authStore = useAuthStore()
const { currentView, setView, currentConfig, currentTableData } = useAttendance();

</script>

<template>
  <div class="attendance-details-container">
    <div class="attendance-details-header">
      <div class="attendance-details-title-area">
        <h1 class="page-title">勤怠詳細</h1>
        <div class="user-date-area">
          <!-- <span class="user-id">ID:{{ authStore.user?.userId }} </span>
          <span class="user-name">{{ authStore.user?.userName }}</span> -->
          <span class="user-id">ID:1</span>
          <span class="user-name">山田太郎</span>
        </div>
      </div>

      <div class="attendance-details-select-card">
        <div class="display-selection-area">
          <div class="display-select-title">
            <p>表示形式</p>
          </div>
          <div class="display-select-btn-area">
            <button type="button" class="select-btn" :class="{ active: currentView === 'daily' }" @click="setView('daily')">日次</button>
            <button type="button" class="select-btn" :class="{ active: currentView === 'weekly' }" @click="setView('weekly')">週次</button>
            <button type="button" class="select-btn" :class="{ active: currentView === 'monthly' }" @click="setView('monthly')">月次</button>
          </div>
        </div>
        
        <div class="display-period-area">
          <div class="display-period-title">
            <p>対象期間</p>
          </div>
          <div class="display-period-btn-area">
            <el-icon><DArrowLeft /></el-icon>
            <p>2026年04月</p>
            <el-icon><DArrowRight /></el-icon>
          </div>
        </div>
      </div>
    </div>

    <div class="attendance-main">
      <h2 class="summary-title">勤怠サマリ</h2>
      <div class="table-wrapper" :class="`${currentView}-view`">
        <table class="custom-table">
          <thead>
            <tr>
              <th v-for="col in currentConfig" :key="col.key">
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in currentTableData" :key="index">
              <td v-for="col in currentConfig" :key="col.key">
                {{ (item as any)[col.key] }}
              </td>
            </tr>
            <tr v-if="currentTableData.length === 0">
            <td :colspan="currentConfig.length" style="text-align: center;">
              データがありません
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/kanda.scss" as *;

.attendance-details-header {
  max-width: 1000px;
  margin: 30px auto;

  @include sp {
    margin: 20px auto;
  }

  .attendance-details-title-area {
    width: 90%;
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 0 auto 30px;

    @include sp {
      flex-direction: column;
      margin: 0 auto 12px;
    }
    
    .page-title {
      white-space: nowrap;
      margin-right: 45px;

      @include sp {
        margin-right: 0px;
        margin-bottom: 10px;
      }
    }
  
    .user-date-area {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }

  .attendance-details-select-card {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    background-color: $accent-bg-color;
    border: 1px solid;
    border-radius: 30px;
    min-height: 100px;

    @include sp {
      width: 100%;
      flex-direction: column;
      align-items: center;
      padding: 15px 0;
      border: none;
      border-radius: 0;
      border-top: 1px solid $table-border-color;
      border-bottom: 1px solid $table-border-color;
    }

    .display-selection-area {
      display: flex;
      align-items: center;
      margin: 0 20px;

      @include sp {
        flex-direction: column;
        align-items: center;
      }

      .display-select-title {
        margin-right: 20px;
            
        @include sp {
          margin: 0;
        }
      }
      
      .display-select-btn-area {
        display: flex;
        gap: 24px;

        @include sp {
          margin: 15px 0;
        }

        .select-btn {
          color: $accent-color;
          border: 1px solid $accent-color;
          background-color: $accent-bg-color;
          font-size: $fs-body;
          width: 70px;
          height: 40px;

          &.active {
            background-color: $accent-color; 
            color: $text-white;
          }
        }
      }
    } 

    .display-period-area {
      display: flex;
      align-items: center;

      @include sp {
        width: 90%;
        justify-content: center;
        margin: 0 auto;
      }

      .display-period-btn-area{
        display: flex;
        align-items: center;
        gap: 24px;
        margin: 0 15px;
      }
    }
  }
}

.attendance-main {
  .summary-title {
    text-align: center;
    margin-bottom: 30px;

    @include sp {
      margin-bottom: 20px;
    }
  }

  .table-wrapper {
    margin: 0 auto 50px;
    width: 80%;
    max-width: 750px;

    .custom-table {
      @include table-style;
    }
    // 日次のみのスタイル
    &.daily-view {
      @include sp {
        width: 90%;
        
        .custom-table{
          thead,tbody{
            font-size: $fs-small;
          }
        }
      }
    }
      // 週次のみのスタイル
    &.weekly-view { 
      max-width: 500px;
    
      @include sp {
        width: 80%;
      }
    }

    // 月次のみのスタイル
    &.monthly-view {
      .custom-table{
        thead {
          th {
            width: 50%;
          }
        }
        tbody{
          font-size: 36px;
          td {
            padding: 50px 0;
            width: 50%;
          }
        }
        @include sp {
          tbody{
            font-size: 24px;
            td {
              padding: 25px 0;
            }
          }
        }
      }
    }
  }
}
</style>
