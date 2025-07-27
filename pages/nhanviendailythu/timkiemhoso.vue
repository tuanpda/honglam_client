<template>
  <div class="column">
    <div class="box">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span style="color: #198754" class="icon is-small is-left">
              <i class="far fa-calendar-alt"></i>
            </span>
            <span style="font-weight: bold; color: #198754"
              >Tìm kiếm hồ sơ kê khai</span
            >
          </div>
        </div>
      </div>

      <div class="box">
        <div class="columns">
          <!-- <div class="column">
            <label class="label">Điểm thu</label>
            <div class="autocomplete">
              <input
                class="input is-small is-danger"
                type="text"
                v-model="diemthu"
                @input="onInput"
                :disabled="isDiemthu"
              />
              <div class="autocomplete-items" v-if="suggestions.length">
                <div
                  class="autocomplete-item"
                  v-for="suggestion in suggestions"
                  @click="selectSuggestion(suggestion)"
                >
                  {{ suggestion }}
                </div>
              </div>
            </div>
          </div> -->
          <div class="column">
            <label class="label">Nhóm tham gia</label>
            <div class="select is-small is-fullwidth">
              <select @change="handleChange">
                <option selected disabled>- Chọn loại hình -</option>
                <option value="">Không chọn</option>
                <option value="AR">Bảo hiểm y tế - Nông lâm - MSTB (AR)</option>
                <option value="BI">Bảo hiểm y tế - HGĐ (BI)</option>
                <option value="IS">Bảo hiểm xã hội tự nguyện (IS)</option>
                <option value="IL">
                  Người tham gia lực lượng An ninh cơ sở (IL)
                </option>
                <option value="IT">
                  Bảo hiểm xã hội tự nguyện - ngoại tỉnh (IT)
                </option>
                <option value="WI">
                  BHYT Người tham gia lực lượng An ninh cơ sở (WI)
                </option>
              </select>
            </div>
          </div>
          <div class="column">
            <label class="label">Ngày kê khai (từ)</label
            ><input v-model="ngaykekhaitu" type="date" class="input is-small" />
          </div>
          <div class="column">
            <label class="label">Ngày kê khai (đến)</label
            ><input
              v-model="ngaykekhaiden"
              type="date"
              class="input is-small"
            />
          </div>

          <div class="column">
            <label class="label">Kỳ Kê khai</label>
            <input
              v-model="kykekhai"
              @blur="validateMonthYear"
              type="text"
              placeholder="MM/YYYY"
              class="input is-small"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <label class="label">Trạng thái hồ sơ</label>
            <div class="select is-small is-fullwidth">
              <select @change="handleTrangThaiChange">
                <option selected disabled>- Chọn trạng thái -</option>
                <option value="">Không chọn</option>
                <option value="dapheduyet">Đã phê duyệt</option>
                <option value="chuapheduyet">Chưa phê duyệt</option>
                <option value="dahuyduyet">Đã hủy duyệt</option>
              </select>
            </div>
          </div>
          <div class="column">
            <label class="label">Điểm thu</label
            >
            <v-select
            v-model="infodaily"
            :options="dsdaily"
            :get-option-label="option => `${option.name} - ${option.cccd}`"
            />
          </div>
          <div class="column">
            <label class="label">Mã số BHXH</label
            ><input v-model="masobhxh" type="text" class="input is-small" />
          </div>
          <div class="column">
            <label class="label">Họ tên</label
            ><input v-model="hoten" type="text" class="input is-small" />
          </div>
        </div>

        <hr class="navbar-divider" />
        <footer class="has-text-right">
          <div class="buttons is-right">
            <button @click="filterData(1)" class="button is-success is-small">
              <span class="icon">
                <i class="fas fa-search"></i>
              </span>
              <span>Tìm kiếm hồ sơ</span>
            </button>

            <button
              :disabled="user.role !== 2"
              @click="xacNhanBienLai()"
              class="button is-small is-danger"
            >
              <span class="icon">
                <i class="fab fa-amazon-pay"></i>
              </span>
              <span>PHÊ duyệt hồ sơ</span>
            </button>

            <button
              :disabled="user.role !== 2"
              @click="xacHUYNhanBienLai()"
              class="button is-small is-warning"
            >
              <span class="icon">
                <i class="fab fa-amazon-pay"></i>
              </span>
              <span>HUỶ duyệt hồ sơ</span>
            </button>
            <ExportExcel_VNPT_D05
              :disabled="!isExport"
              :data_execl="selectedItems_execl_export"
            />
            <ExportExcel_Vnpt
              :disabled="!isExport"
              :data_execl="selectedItems_execl_export"
            />
          </div>
        </footer>
      </div>

      <div style="margin-top: 20px">
        <div class="table_wrapper">
          <table
            class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          >
            <thead style="font-weight: bold">
              <tr style="font-size: small; background-color: #faf0e6">
                <td rowspan="2" style="text-align: center">
                  Chọn để <br />xuất execl<br />
                  <input
                    type="checkbox"
                    v-model="selectAll_execl"
                    @change="toggleAll_execl"
                  />
                </td>
                <td rowspan="2" style="text-align: center">
                  Chọn để <br />duyệt/hủy<br />
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="toggleAll"
                  />
                </td>
                <td rowspan="2" style="text-align: center; width: 3%">STT</td>
                <td rowspan="2" style="text-align: center">_ID</td>
                <td
                  style="text-align: center; cursor: pointer"
                  @click="sortByField('trangthai')"
                >
                  Trạng thái
                  <span v-if="sortBy === 'trangthai'">
                    <i v-if="!sortDesc" class="fas fa-sort-up"></i>
                    <i v-else class="fas fa-sort-down"></i>
                  </span>
                </td>

                <td style="text-align: center">Biên lai</td>
                <td rowspan="2" style="text-align: center">
                  Reset <br />
                  hồ sơ
                </td>
                <td rowspan="2" style="text-align: center">Mã đại lý</td>
                <td rowspan="2" style="text-align: center">Tên đại lý</td>
                <td rowspan="2" style="text-align: center">Người tạo</td>
                <td rowspan="2" style="text-align: center">Loại hình</td>
                <td rowspan="2" style="text-align: center">Kỳ kê khai</td>
                <td rowspan="2" style="text-align: center">Ngày kê khai</td>
                <td rowspan="2" style="text-align: center">Mã số BHXH</td>
                <td rowspan="2" style="text-align: center">Người hưởng</td>
                <td rowspan="2" style="text-align: center">Ngày sinh</td>
                <td rowspan="2" style="text-align: center">Giới tính</td>
                <td rowspan="2" style="text-align: center">CCCD</td>
                <td rowspan="2" style="text-align: center">Điện thoại</td>
                <td rowspan="2" style="text-align: center">Phương án</td>
                <td rowspan="2" style="text-align: center">Số tiền</td>
                <td rowspan="2" style="text-align: center">Từ ngày</td>
                <td rowspan="2" style="text-align: center">Số tháng</td>
                <td rowspan="2" style="text-align: center">Mức tiền đóng</td>
                <td rowspan="2" style="text-align: center">Từ tháng</td>
                <td rowspan="2" style="text-align: center">Đối tượng</td>
                <td rowspan="2" style="text-align: center">Ghi chú</td>
                <td rowspan="2" style="text-align: center">Lý do hủy hồ sơ</td>
              </tr>
            </thead>
            <tbody>
              <tr
                style="font-size: small"
                v-for="(item, index) in data_kekhai"
                :key="index"
              >
                <td style="text-align: center">
                  <input
                    class=""
                    type="checkbox"
                    v-model="selectedItems_execl_export"
                    :value="item"
                  />
                </td>
                <td style="text-align: center">
                  <input
                    class=""
                    type="checkbox"
                    v-model="selectedItems"
                    :value="item"
                    :disabled="
                      item.trangthai !== 0 || item.status_naptien === true
                    "
                  />
                </td>

                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="">{{ item._id }}</td>
                <td style="text-align: center">
                  <template v-if="item.trangthai === 1">
                    <span style="font-weight: 700; color: #ffc107"
                      >Đã huỷ duyệt</span
                    ></template
                  >
                  <template v-else>
                    <template v-if="item.status_naptien == true">
                      <span style="font-weight: 700; color: #00947e"
                        >Đã duyệt</span
                      >
                    </template>
                    <template v-else>
                      <span style="font-weight: 700; color: #dc3545"
                        >Chưa duyệt</span
                      >
                    </template>
                  </template>
                </td>
                <td style="text-align: center">
                  <a @click="xemBienLai(item)">
                    <span style="color: #ff69b4" class="icon is-small is-left">
                      <i class="fas fa-print"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center">
                  <a @click="resetHoso(item)" v-show="user.role === 2">
                    <span style="color: #dc3545" class="icon is-small is-left">
                      <i class="fas fa-compress-alt"></i>
                    </span>
                  </a>
                </td>
                <td style="text-align: center">{{ item.madaily }}</td>
                <td style="text-align: left">{{ item.tendaily }}</td>
                <td style="text-align: left">{{ item.tennguoitao }}</td>
                <td style="text-align: center">{{ item.maloaihinh }}</td>
                <td style="text-align: center">{{ item.kykekhai }}</td>
                <td style="text-align: center">{{ item.ngaykekhai }}</td>

                <td style="text-align: center">{{ item.masobhxh }}</td>
                <td style="text-align: center">{{ item.hoten }}</td>
                <td style="text-align: right">{{ item.ngaysinh }}</td>
                <td style="text-align: center">{{ item.gioitinh }}</td>
                <td style="text-align: center">{{ item.cccd }}</td>

                <td style="text-align: center">{{ item.dienthoai }}</td>
                <td style="text-align: center">{{ item.maphuongan }}</td>
                <td style="text-align: right; color: red; font-weight: 700">
                  {{ item.sotien | formatNumber }}
                </td>
                <td style="text-align: center">{{ item.tungay }}</td>
                <td style="text-align: center">{{ item.maphuongthucdong }}</td>

                <td style="text-align: right; color: red; font-weight: 700">
                  {{ item.muctiendong | formatNumber }}
                </td>
                <td style="text-align: center">{{ item.tuthang }}</td>
                <td style="text-align: center">{{ item.tendoituong }}</td>
                <td style="text-align: center">{{ item.ghichu }}</td>
                <td style="text-align: center">{{ item.lydohuy }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="margin: 5px; font-weight: 700; color: #dc3545">
          Tổng tiền: {{ totalSoTien | formatNumber }}
        </div>
        <!-- Phân trang -->
        <div v-if="data_kekhai.length > 0" style="margin-top: 10px">
          <nav
            class="pagination is-centered is-rounded"
            role="navigation"
            aria-label="pagination"
          >
            <!-- Nút trang đầu tiên -->
            <button
              :disabled="currentPage === 1"
              @click="goToPage(1)"
              class="pagination-previous button is-info is-light is-small"
            >
              Đầu tiên
            </button>

            <!-- Nút Previous -->
            <button
              :disabled="currentPage === 1"
              @click="goToPreviousPage"
              class="pagination-previous button is-info is-light is-small"
            >
              Trang trước
            </button>

            <!-- Nút Next -->
            <button
              :disabled="currentPage === totalPages"
              @click="goToNextPage"
              class="pagination-next button is-danger is-light is-small"
            >
              Trang tiếp
            </button>

            <!-- Nút trang cuối cùng -->
            <button
              :disabled="currentPage === totalPages"
              @click="goToPage(totalPages)"
              class="pagination-next button is-danger is-light is-small"
            >
              Cuối cùng
            </button>

            <ul class="pagination-list">
              <!-- Hiển thị các nút phân trang -->
              <li v-for="page in visiblePages" :key="page">
                <button
                  :class="[
                    'pagination-link',
                    { 'is-current': page === currentPage },
                    'is-small',
                  ]"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Biểu tượng loading -->
      <div v-if="isLoading" class="loading-overlay">
        <!-- Biểu tượng loading -->
        <div class="loading-spinner"></div>
        <span>waitting some minute ...</span>
      </div>

      <!-- modal dữ liệu đã duyệt -->
      <div class="">
        <div :class="{ 'is-active': isActive }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card-predata">
            <section class="modal-card-body">
              <div>
                <span style="font-weight: 800; font-size: 15px; color: #3cb371"
                  >Báo cáo trạng thái DUYỆT hồ sơ</span
                >
              </div>
              <div style="margin-top: 10px">
                <div v-if="dulieuPheduyet.length > 0" class="table_wrapper">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #fff8dc">
                        <td style="text-align: center; width: 3%">_ID HS</td>
                        <td style="text-align: center">Mã số BHXH</td>
                        <td style="text-align: center">Họ tên</td>
                        <td style="text-align: center">
                          Trạng thái gửi Phê duyệt vào hệ thống
                        </td>
                        <td style="text-align: center">Lỗi (nếu có)</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in dulieuPheduyet"
                        :key="index"
                        style="font-size: small"
                      >
                        <td style="text-align: center; vertical-align: middle">
                          {{ index + 1 }}
                        </td>
                        <td style="text-align: center; font-weight: 500">
                          {{ item.masobhxh }}
                        </td>
                        <td style="font-weight: 500">
                          {{ item.hoten }}
                        </td>
                        <td style="text-align: center">
                          {{ item.status }}
                        </td>
                        <td style="text-align: center">
                          {{ item.error }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style="text-align: end; margin-top: 10px">
                <button
                  @click="closeDanhsachduyet()"
                  class="button is-small is-info"
                >
                  Thoát
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <!-- modal dữ liệu huỷ duyệt -->
      <div class="">
        <div :class="{ 'is-active': isActive_fix }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card-predata">
            <section class="modal-card-body">
              <div>
                <span style="font-weight: 800; font-size: 15px; color: #3cb371"
                  >Báo cáo trạng thái HUỶ duyệt hồ sơ</span
                >
              </div>

              <div style="margin-top: 10px">
                <div v-if="dulieuHuyPheDuyet.length > 0" class="table_wrapper">
                  <table
                    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                  >
                    <thead style="font-weight: bold">
                      <tr style="font-size: small; background-color: #fff8dc">
                        <td style="text-align: center; width: 3%">_ID HS</td>
                        <td style="text-align: center">Mã số BHXH</td>
                        <td style="text-align: center">Họ tên</td>
                        <td style="text-align: center">
                          Trạng thái gửi HUỶ phê duyệt vào hệ thống
                        </td>
                        <td style="text-align: center">Lý do hủy duyệt</td>
                        <td style="text-align: center">Lỗi (nếu có)</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in dulieuHuyPheDuyet"
                        :key="index"
                        style="font-size: small"
                      >
                        <td style="text-align: center; vertical-align: middle">
                          {{ index + 1 }}
                        </td>
                        <td style="text-align: center; font-weight: 500">
                          {{ item.masobhxh }}
                        </td>
                        <td style="font-weight: 500">
                          {{ item.hoten }}
                        </td>
                        <td style="text-align: center">
                          {{ item.status }}
                        </td>
                        <td style="text-align: center">
                          {{ item.ghichu }}
                        </td>
                        <td style="text-align: center">
                          {{ item.error }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <div style="text-align: end; margin-top: 10px">
              <button
                @click="closeDanhsachhuyDuyet()"
                class="button is-small is-info"
              >
                Thoát
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import company from "@/config.company";
import ExportExcel_VNPT_D05 from "@/components/exportExecl/vnptD05";
import ExportExcel_Vnpt from "@/components/exportExecl/vnpt";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
import * as XLSX from "xlsx";
const { DateTime } = require("luxon");
import backgroundImage from "~/assets/images/bhxh.png";
import qrcode from "~/assets/images/QR-BHXH.png";
import huyHoadon from "~/assets/images/HUYHOADON.png";

import { mixinDmBhxh } from "../../mixins/mixinDmBhxh";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});

import jsPDF from "jspdf";

import "~/assets/font/OpenSans-Bold-normal";
import "~/assets/font/OpenSans_SemiCondensed-Italic-normal";
import "~/assets/font/OpenSans-ExtraBold-normal";
import "~/assets/font/Times New Roman Bold-normal";

import num2words from "vn-num2words";

export default {
  name: "DanhsachKekhaiPage",
  components: {
    ExportExcel_VNPT_D05,
    ExportExcel_Vnpt,
  },

  data() {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    return {
      data_kekhai: [],
      data_xuatmau: [],
      isActive: false,
      isActive_detail: false,
      isActive_fix: false,
      isVtVnpt: false,

      // pagi
      currentPage: 1,
      totalPages: 1,

      // new code
      kykekhai: "",
      dotkekhai: "",
      ngaykekhaiden: today,
      ngaykekhaitu: today,
      sohoso: "",
      matochuc_mst: "",
      masobhxh: "",
      hoten: "",
      maloaihinh: "",
      trangthaihs: "",
      sortBy: null, // ví dụ: 'trangthai'
      sortDesc: false, // true = giảm dần, false = tăng dần

      data_kekhai_details: [],
      isRoleSent: false,

      // input suggest
      suggestions: [],
      suggestions_diemthu: [],
      diemthu: "",
      madaily: "",
      cccd: "",
      isDiemthu: false,

      dtaDiemthu: [],
      listhsloi: [],
      selectedItem: {},

      editKey: 0,

      selectedItems: [], // chứa danh sách các dòng đã được chọn
      selectedItems_execl_export: [], // ds xuất execl
      selectAll: false,
      selectAll_execl: false,

      dulieuPheduyet: [],
      dulieuHuyPheDuyet: [],
      isLoading: false,
      isExport: false,

      dsdaily: [],
      infodaily: '',
    };
  },

  // mounted() {
  //   this.getDateTime();
  //   this.getDmDiemthu();
  //   this.isRoleSent = this.$auth.user.res_sent;
  //   // console.log(this.$auth.user.res_sent);
  //   if (this.$auth.user.nvcongty == 0) {
  //     this.madaily = this.$auth.user.madaily;
  //     this.diemthu = this.$auth.user.tendaily;
  //     this.isDiemthu = true;
  //   }
  // },

  watch: {
    selectedItems(newVal) {
      this.selectAll = newVal.length === this.data_kekhai.length;
    },
  },

  mounted() {
    const user = this.user;

    this.dailyview = user.madaily;
    this.tochuc = user.matochuc;
    this.cccd = user.cccd;
    this.isRoleSent = user.res_sent;
    this.madaily = user.madaily;
    this.diemthu = user.tendaily;

    if (user.role == 2) {
      this.diemthu = "Tài khoản tổng hợp";
    } else {
      this.diemthu = user.tendaily;
      this.isDiemthu = true;
    }

    this.getDateTime();
    this.getDmDiemthu();
    this.hosoLoitrave();
    this.getDsdaily();
  },

  computed: {
    user() {
      return this.$store.state.user || {};
    },

    totalSoTien() {
      if (this.data_kekhai && this.data_kekhai.length > 0) {
        return this.data_kekhai
          .filter(
            (item) => item.trangthai === 0 && item.status_naptien === true
          )
          .reduce((acc, item) => {
            const sotienStr = item.sotien?.toString().replace(/,/g, "");
            let numericValue = parseFloat(sotienStr);
            if (isNaN(numericValue)) {
              numericValue = 0;
            }
            return acc + numericValue;
          }, 0);
      }
      return 0;
    },

    visiblePages() {
      const pages = [];
      const maxVisiblePages = 5; // Số lượng trang hiển thị tối đa

      // Xác định phạm vi của các trang hiển thị
      let startPage = Math.max(
        1,
        this.currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    },
  },

  methods: {
    // cập nhật ngày 27 tháng 7 năm 2025
    async getDsdaily(){
      const res = await this.$axios.get(`/api/kekhai/danhsachdaily`)
      // console.log(res.data.hs)
      this.dsdaily=res.data.hs
    },

    sortByField(field) {
      if (this.sortBy === field) {
        this.sortDesc = !this.sortDesc;
      } else {
        this.sortBy = field;
        this.sortDesc = false;
      }

      this.data_kekhai.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (aValue == null) return 1;
        if (bValue == null) return -1;

        if (aValue < bValue) return this.sortDesc ? 1 : -1;
        if (aValue > bValue) return this.sortDesc ? -1 : 1;
        return 0;
      });
    },

    toggleAll() {
      if (this.selectAll) {
        // Chỉ chọn các item có trangthai = 0 và status_naptien = false
        this.selectedItems = this.data_kekhai.filter(
          (item) => item.trangthai === 0 && item.status_naptien === false
        );
      } else {
        // Bỏ chọn tất cả
        this.selectedItems = [];
      }
    },

    toggleAll_execl() {
      if (this.selectAll_execl) {
        this.selectedItems_execl_export = this.data_kekhai;
      } else {
        // Bỏ chọn tất cả
        this.selectedItems_execl_export = [];
      }

      // console.log(this.selectedItems_execl_export);
    },

    handleClick(item) {
      if (item.status_hosoloi !== 1) return;
      this.vieweditHs(item);
    },
    // suggest điểm thu
    onInput() {
      if (!this.diemthu) {
        this.suggestions = [];
        return;
      }
      const MAX_SUGGESTIONS = 5; // Số lượng suggest tối đa
      this.suggestions = this.dtaDiemthu
        .map((c) => c.tenDiemThu)
        .filter((tenDiemThu) =>
          tenDiemThu.toLowerCase().includes(this.diemthu.toLowerCase())
        )
        .map((tenDiemThu) => tenDiemThu.trim())
        .slice(0, MAX_SUGGESTIONS);
    },
    selectSuggestion(suggestion) {
      if (suggestion) {
        this.diemthu = suggestion.trim();
        this.suggestions = [];
      }
    },
    // end suggest điểm thu

    validateMonthYear() {
      const regex = /^(0[1-9]|1[0-2])\/\d{4}$/; // Định dạng MM/YYYY
      if (!regex.test(this.kykekhai)) {
        this.kykekhai = ""; // Xóa giá trị nếu không đúng định dạng
        alert("Định dạng không đúng. Vui lòng nhập MM/YYYY.");
      }
    },

    async getDmDiemthu() {
      const res = await this.$axios.get(`/api/kekhai/danhmucdaily`);
      // console.log(res);
      this.dtaDiemthu = res.data;
    },

    formatCurrency(text) {
      const number = parseFloat(text);
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },

    formatISODateToDMY(isoDateString) {
      const date = new Date(isoDateString);

      // Lấy ngày, tháng và năm từ đối tượng Date
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      // Tạo chuỗi ngày tháng dd/mm/yyyy
      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    },

    getDateTime() {
      const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
      const kyKeKhai = nowInVietnam.toFormat("MM/yyyy");

      // Lấy các phần tử riêng lẻ
      const year = nowInVietnam.year; // Năm
      const month = nowInVietnam.month; // Tháng
      const day = nowInVietnam.day; // Ngày
      const hour = nowInVietnam.hour; // Giờ
      const minute = nowInVietnam.minute; // Phút
      const second = nowInVietnam.second; // Giây

      this.kykekhai = kyKeKhai;
    },

    async hosoLoitrave() {
      const madaily = { madaily: this.dailyview };
      try {
        const res = await this.$axios.post(
          `/api/kekhai/hosoloitrave-diemthu`,
          madaily
        );
        // console.log(res);
        if (res.data.success == true) {
          this.listhsloi = res.data.hs;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async view_details(data) {
      this.data_kekhai_details = [];

      const rs = await this.$axios.get(
        `/api/kekhai/get-all-kekhai-xuatmau?sohoso=${data.sohoso}`
      );
      // console.log(rs.data.kekhai);
      this.data_kekhai_details = rs.data.kekhai;
      this.data_kekhai_details = this.data_kekhai_details.map((item) => ({
        ...item,
        isSent: false, // Gán trạng thái gửi mặc định là chưa gửi
      }));
      this.isActive_detail = true;
    },

    calculateEndDate(tuNgay, soThang) {
      // Chuyển đổi tuNgay từ chuỗi "dd/mm/yyyy" sang đối tượng Date
      const [day, month, year] = tuNgay.split("/").map(Number);
      let startDate = new Date(year, month - 1, day); // Month in Date is 0-based

      // Cộng thêm số tháng vào ngày bắt đầu
      startDate.setMonth(startDate.getMonth() + Number(soThang));

      // Trừ một ngày để có ngày cuối cùng của tháng trước tháng kết thúc
      startDate.setDate(startDate.getDate() - 1);

      // Lấy ngày, tháng, năm của ngày kết thúc
      let endDay = String(startDate.getDate()).padStart(2, "0");
      let endMonth = String(startDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1
      let endYear = startDate.getFullYear();

      // Trả về ngày kết thúc dưới dạng "dd/mm/yyyy"
      return `${endDay}/${endMonth}/${endYear}`;
    },

    async handleChange(event) {
      const selectedValue = event.target.value; // Lấy giá trị của option được chọn
      // console.log("Selected value:", selectedValue);
      if (selectedValue === "") {
        this.maloaihinh = selectedValue;
        this.isExport = false; // Không xuất khi không có loại hình nào được chọn
      } else {
        this.maloaihinh = selectedValue;
        this.isExport = true;
      }

      // console.log(this.maloaihinh);
      // console.log(this.isExport);
    },

    async handleTrangThaiChange(event) {
      const selectedValue = event.target.value; // Lấy giá trị của option được chọn
      // console.log("Selected value:", selectedValue);
      this.trangthaihs = selectedValue;
      // console.log(this.trangthaihs);
    },

    async filterData(page) {
      // console.log(this.data_kekhai);
      // console.log(this.$auth.user);
      // Tách chuỗi theo dấu gạch ngang
      // const parts = this.tochuc.split("-");
      // const mst = parts[parts.length - 1]; // 2902141757
      // this.matochuc_mst = mst;
      // Xây dựng đường dẫn API dựa trên mã số thuế

      if (this.user.role == 2) {
        // console.log(this.infodaily.name)
        const tennguoitao=this.infodaily.name
        // const res = await this.$axios.get(
        //   `/api/kekhai/kykekhai-search-series-pagi-nvcty?kykekhai=${this.kykekhai}&page=${page}`
        // );
        try {
          // const res = await this.$axios.get(
          //   `/api/kekhai/kykekhai-search-hoso?kykekhai=${this.kykekhai}&dotkekhai=${this.dotkekhai}&ngaykekhai=${this.ngaykekhaitu}&ngaykekhaiden=${this.ngaykekhaiden}&sohoso=${this.sohoso}&masobhxh=${this.masobhxh}&hoten=${this.hoten}&tendaily=${this.diemthu}&maloaihinh=${this.maloaihinh}&page=${page}`
          // );
          // tạm thời bỏ điểm thu ra code ngày 07/5/2025. code sửa ngày 18/06/2025 bỏ kỳ kê khai ra khỏi thành phần tìm kiếm. thay vào đó là
          // trạng thái hồ sơ. đẩy query tên trangthaihs (đại diện thay cho trangthai và status_naptien)
          const res = await this.$axios.get(
            `/api/kekhai/kykekhai-search-hoso-pheduyeths?tennguoitao=${tennguoitao}&trangthaihs=${this.trangthaihs}&dotkekhai=${this.dotkekhai}&ngaykekhai=${this.ngaykekhaitu}&ngaykekhaiden=${this.ngaykekhaiden}&sohoso=${this.sohoso}&masobhxh=${this.masobhxh}&hoten=${this.hoten}&maloaihinh=${this.maloaihinh}&page=${page}`
          );
          // console.log(res);
          if (res.data.results.length > 0) {
            this.data_kekhai = res.data.results;
            this.totalPages = res.data.info.pages;
            this.currentPage = page;
          } else {
            this.data_kekhai = [];
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: `Không tìm thấy hồ sơ`,
            });
          }
        } catch (error) {
          this.data_kekhai = [];
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `Có lỗi xảy ra`,
          });
        }
      } else {
        try {
          // console.log(this.cccd);

          const res = await this.$axios.get(
            `/api/kekhai/kykekhai-search-hoso-diemthu-pheduyeths?cccd=${this.cccd}&trangthaihs=${this.trangthaihs}&dotkekhai=${this.dotkekhai}&ngaykekhai=${this.ngaykekhaitu}&ngaykekhaiden=${this.ngaykekhaiden}&sohoso=${this.sohoso}&masobhxh=${this.masobhxh}&hoten=${this.hoten}&madaily=${this.madaily}&maloaihinh=${this.maloaihinh}&page=${page}`
          );
          if (res.data.results.length > 0) {
            this.data_kekhai = res.data.results;
            this.totalPages = res.data.info.pages;
            this.currentPage = page;
          } else {
            this.data_kekhai = [];
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: `Không tìm thấy hồ sơ`,
            });
          }
        } catch (error) {
          this.data_kekhai = [];
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: `Có lỗi xảy ra`,
          });
        }
      }
    },

    async inLaiBienLaiDienTu(dataBienlaidientu) {
      // NẾU HỦY THÀNH CÔNG THÌ HỦY BIÊN LAI VÀ GHI VÀO DỮ LIỆU
      // gọi hàm tạo lại hóa đơn
      const dateStr = dataBienlaidientu.ngaybienlai;
      const year = dateStr.split(" ")[0].split("-")[2];
      // console.log(dateStr, year);

      const dataPost = {
        hosoIdentity: dataBienlaidientu.hosoIdentity,
        maSoBhxh: dataBienlaidientu.masobhxh,
        hoTen: dataBienlaidientu.hoten,
        soCccd: dataBienlaidientu.cccd,
        ngaySinh: dataBienlaidientu.ngaysinh,
        gioiTinh: dataBienlaidientu.gioitinh,
        soDienThoai: dataBienlaidientu.sodienthoai,
        nguoithutien: dataBienlaidientu.nguoithutien,
        maloaihinh: dataBienlaidientu.loaihinh,
        soTien: dataBienlaidientu.sotien,
        soThang: dataBienlaidientu.sothang,
        tuNgay: dataBienlaidientu.tungay,
        denNgay: dataBienlaidientu.denngay,
        tuThang: dataBienlaidientu.tuthang,
        denThang: dataBienlaidientu.denthang,
        maDaiLy: dataBienlaidientu.madaily,
        tenDaiLy: dataBienlaidientu.tendaily,
        sobienlai: dataBienlaidientu.sobienlai,
        ngaybienlai: dataBienlaidientu.ngaybienlai,
        tothon: dataBienlaidientu.tothon,
        tenquanhuyen: dataBienlaidientu.tenquanhuyen,
        tentinh: dataBienlaidientu.tentinh,
        currentYear: year,
        urlNameInvoice: dataBienlaidientu.urlNameInvoice,
        cccd_nguoithutien: dataBienlaidientu.cccd_nguoithutien,
        lydohuy: dataBienlaidientu.lydohuy,
        ngayhuybienlai: dataBienlaidientu.ngayhuybienlai,
        nguoihuybienlai: dataBienlaidientu.nguoihuybienlai,
      };
      // console.log(dataPost);

      await this.inBienLaiDientu(dataPost);
    },

    // HÀM XÁC NHẬN HỒ SƠ KE KHAI CHO TRƯỜNG STATUS_NAPTIEN==1
    async xacNhanBienLai() {
      if (!this.selectedItems || this.selectedItems.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Chưa chọn hồ sơ",
          text: "Vui lòng chọn ít nhất một hồ sơ trước khi xác nhận.",
        });
        return;
      }

      const result = await Swal.fire({
        title: `Xác nhận PHÊ duyệt hồ sơ ?`,
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Hủy gửi`,
      });

      if (result.isConfirmed) {
        let ketquaTongHop = [];
        this.isLoading = true;
        for (const item of this.selectedItems) {
          const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
          const formattedDate = nowInVietnam.toFormat("dd-MM-yyyy HH:mm:ss");
          try {
            const res = await this.$axios.post(
              "/api/kekhai/apply-invoice-status",
              {
                _id: item._id,
                hoten: item.hoten,
                masobhxh: item.masobhxh,
                hosoIdentity: item.hosoIdentity,
                nguoipheduyet: this.user.name,
                ngaypheduyet: formattedDate,
              }
            );

            if (res.data.success) {
              ketquaTongHop.push({
                _id: res.data.data._id,
                hoten: res.data.data.hoten,
                masobhxh: res.data.data.masobhxh,
                status: "✅ Thành công",
                message: res.data.message,
              });
            } else {
              ketquaTongHop.push({
                _id: res.data.data._id,
                hoten: res.data.data.hoten,
                masobhxh: res.data.data.masobhxh,
                status: "❌ Thất bại",
                error: res.data.message,
              });
            }
          } catch (error) {
            ketquaTongHop.push({
              _id: item._id,
              hoten: item.hoten,
              masobhxh: item.masobhxh,
              status: "❌ Lỗi hệ thống",
              error: error.response?.data?.message || error.message,
            });
          }
        }

        // Hiển thị kết quả ra console (bạn có thể dùng để show lên modal)
        this.dulieuPheduyet = ketquaTongHop;
        this.isLoading = false;
        this.isActive = true;
      }
    },

    // HÀM HUỶ DUYỆT HỒ SƠ TRANGTHAI=1

    async xacHUYNhanBienLai() {
      // console.log(this.selectedItems);

      if (!this.selectedItems || this.selectedItems.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Chưa chọn hồ sơ",
          text: "Vui lòng chọn ít nhất một hồ sơ trước khi xác nhận.",
        });
        return;
      }

      const { value: lyDo, isConfirmed } = await Swal.fire({
        title: "Lý do hủy duyệt",
        input: "textarea",
        inputPlaceholder: "Nhập lý do tại đây...",
        inputAttributes: {
          "aria-label": "Nhập lý do hủy duyệt hồ sơ",
        },
        showCancelButton: true,
        confirmButtonText: "Xác nhận hủy duyệt",
        cancelButtonText: "Hủy",
        inputValidator: (value) => {
          if (!value) {
            return "Bạn phải nhập lý do HỦY hồ sơ này!";
          }
        },
      });

      if (isConfirmed && lyDo) {
        // Thực hiện xử lý với lý do
        // console.log("Lý do hủy duyệt:", lyDo);

        let ketquaTongHop = [];
        this.isLoading = true;

        for (const item of this.selectedItems) {
          const nowInVietnam = DateTime.now().setZone("Asia/Ho_Chi_Minh");
          const formattedDate = nowInVietnam.toFormat("dd-MM-yyyy HH:mm:ss");
          try {
            const res = await this.$axios.post(
              "/api/kekhai/cancel-invoice-status",
              {
                _id: item._id,
                hoten: item.hoten,
                masobhxh: item.masobhxh,
                lydohuy: lyDo,
                nguoipheduyet: this.user.name,
                ngaypheduyet: formattedDate,
                hosoIdentity: item.hosoIdentity,
                ngayhuybienlai: formattedDate,
                nguoihuybienlai: this.user.name,
              }
            );

            if (res.data.success) {
              ketquaTongHop.push({
                _id: res.data.data._id,
                hoten: res.data.data.hoten,
                masobhxh: res.data.data.masobhxh,
                lydohuy: lyDo,
                status: "✅ Thành công",
                message: res.data.message,
              });

              // gọi lại tìm biên lai
              const dataFindbl = {
                hosoIdentity: item.hosoIdentity,
              };
              const res_finbl = await this.$axios.post(
                `/api/kekhai/find-bienlaidientu-huybienlai`,
                dataFindbl
              );
              // console.log(res_finbl.data.hs);
              // const dataBienlaidientu = res_finbl.data.hs;
              // console.log(dataBienlaidientu);
              const dataBienlaidientu = res_finbl.data.hs;

              // gọi hàm in lại biên lai
              await this.inLaiBienLaiDienTu(dataBienlaidientu);
            } else {
              ketquaTongHop.push({
                _id: res.data.data._id,
                hoten: res.data.data.hoten,
                masobhxh: res.data.data.masobhxh,
                lydohuy: lydohuy,
                status: "❌ Thất bại",
                error: res.data.message,
              });
            }
          } catch (error) {
            ketquaTongHop.push({
              _id: item._id,
              hoten: item.hoten,
              masobhxh: item.masobhxh,
              status: "❌ Lỗi hệ thống",
              error: error.response?.data?.message || error.message,
            });
          }
        }

        // Hiển thị kết quả ra console (bạn có thể dùng để show lên modal)
        // console.table(ketquaTongHop);
        this.dulieuHuyPheDuyet = ketquaTongHop;
        this.dulieuPheduyet = []; // Reset dữ liệu phê duyệt
        this.isLoading = false;
        this.isActive_fix = true;
      }
    },

    closeDanhsachduyet() {
      this.selectedItems = [];
      this.dulieuPheduyet = [];
      this.dulieuHuyPheDuyet = [];
      this.isActive = false;
      this.filterData(1);
    },

    closeDanhsachhuyDuyet() {
      this.selectedItems = [];
      this.dulieuPheduyet = [];
      this.dulieuHuyPheDuyet = [];
      this.isActive_fix = false;
      this.filterData(1);
    },

    // pagi
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.filterData(this.currentPage - 1);
      }
    },

    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.filterData(this.currentPage + 1);
      }
    },

    goToPage(page) {
      this.filterData(page); // Di chuyển đến trang được chỉ định
    },

    exportToExcel() {
      if (this.data_kekhai.length == 0) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "error",
          title: `Chưa có dữ liệu hồ sơ`,
        });
      } else {
        // 1. Chuyển đổi mảng dữ liệu thành worksheet
        const worksheet = XLSX.utils.json_to_sheet(this.data_kekhai);

        // 2. Tạo workbook và thêm worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

        // 3. Xuất file Excel
        XLSX.writeFile(workbook, "hosokekhai.xlsx");
      }
    },

    async resetHoso(data) {
      // khi reset hồ sơ sẽ đặt như sau
      // lấy toàn bộ thông tin trạng thái của hồ sơ hiện tại
      // console.log(data.trangthai, data.status_naptien); // 0 - True
      // xác định:
      // 1: nếu trangthai=1 là hồ sơ đã bị huỷ duyệt
      // 2: nếu trangthai=0 và status_naptien=true là hồ sơ đã duyệt
      if (this.user.role != 2) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Bạn không có quyền thực hiện chức năng này.",
        });
        return;
      }
      // trường hợp 1 là hồ sơ bị huỷ rồi giờ rs lại
      if (data.trangthai === 1) {
        const result = await Swal.fire({
          title: `Hồ sơ đã bị huỷ! Xác nhận phục hồi hồ sơ?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Hủy`,
        });

        if (result.isConfirmed) {
          try {
            const res = await this.$axios.post(
              "/api/kekhai/reset-hoso-from-dahuy-to-chuaduyet",
              {
                _id: data._id,
                hosoIdentity: data.hosoIdentity,
              }
            );

            // console.log(res);

            if (res.data.success) {
              Swal.fire("Thành công", "Hồ sơ đã được phục hồi.", "success");
              this.filterData(1);
            } else {
              this.filterData(1);
              Swal.fire("Thất bại", res.data.message, "error");
            }
          } catch (error) {
            this.filterData(1);
            console.error("Lỗi khi phục hồi hồ sơ:", error);
            Swal.fire("Lỗi", "Không thể phục hồi hồ sơ.", "error");
          }
        }
      }
      // trường hợp 2 là hồ sơ đã duyệt rồi giờ rs lại
      else if (data.trangthai === 0 && data.status_naptien === true) {
        const result = await Swal.fire({
          title: `Hồ sơ đã được duyệt! Xác nhận phục hồi hồ sơ?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Hủy`,
        });

        if (result.isConfirmed) {
          try {
            const res = await this.$axios.post(
              "/api/kekhai/reset-hoso-from-daduyet-to-chuaduyet",
              {
                _id: data._id,
                hosoIdentity: data.hosoIdentity,
              }
            );

            // console.log(res);

            if (res.data.success) {
              Swal.fire("Thành công", "Hồ sơ đã được phục hồi.", "success");
              this.filterData(1);
            } else {
              this.filterData(1);
              Swal.fire("Thất bại", res.data.message, "error");
            }
          } catch (error) {
            this.filterData(1);
            console.error("Lỗi khi phục hồi hồ sơ:", error);
            Swal.fire("Lỗi", "Không thể phục hồi hồ sơ.", "error");
          }
        }
      }
    },

    async xemBienLai(item) {
      // console.log(item.hosoIdentity);
      try {
        const res = await this.$axios.get(
          `/api/kekhai/view-item-bienlai?hosoIdentity=${item.hosoIdentity}`
        );

        let hs = res.data.hs;
        let pdfUrl = "";
        if (hs && hs.urlNameInvoice) {
          const trangthai = hs.active;
          if (trangthai !== 0) {
            pdfUrl = `${company.clientURL}/bienlaidientu/${hs.urlNameInvoice}.pdf`;
          } else {
            pdfUrl = `${company.clientURL}/bienlaidientu/bienlaidahuy/${hs.urlNameInvoice}.pdf`;
          }

          window.open(pdfUrl, "_blank");
        } else {
          console.warn("Thiếu thông tin số biên lai hoặc họ tên!");
          this.$swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Không lấy được thông tin biên lai.",
          });
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        this.$swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể kết nối đến máy chủ.",
        });
      }
    },

    async vieweditHs(item) {
      this.isActive_fix = true;
      // console.log(data);
      // this.selectedItem = item;
      this.selectedItem = JSON.parse(JSON.stringify(item)); // tạo bản sao để không ảnh hưởng dữ liệu gốc
      this.editKey = Date.now(); // tạo key mới để ép component con re-render
      // console.log(this.selectedItem);
    },

    closeModal() {
      this.isActive_fix = false;
      this.selectedItem = null;
      this.filterData(1);
    },

    async inBienLaiDientu(data) {
      const doc = new jsPDF({
        orientation: "l",
        format: "a5",
      });

      // Kích thước trang PDF
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Kích thước ảnh bạn muốn (ví dụ: 100mm x 70mm)
      const imageWidth = 100; // Chiều rộng của ảnh
      const imageHeight = 70; // Chiều cao của ảnh

      // Tính tọa độ để ảnh nằm chính giữa trang
      const x = (pageWidth - imageWidth) / 2; // Căn giữa theo chiều ngang
      const y = (pageHeight - imageHeight) / 2; // Căn giữa theo chiều dọc

      // Thêm ảnh vào PDF
      doc.addImage(backgroundImage, "PNG", x, y, imageWidth, imageHeight);
      const img = new Image();
      img.src = backgroundImage; // hoặc base64 string

      const imageWidthHUY = 100; // Chiều rộng của ảnh
      const imageHeightHUY = 70; // Chiều cao của ảnh
      // // ĐOẠN NÀY PHẢI XEM XÉT VIỆC CHÈN ẢNH ĐÃ HỦY HOẶC XÁC NHẬN BIÊN LAI
      doc.addImage(huyHoadon, "PNG", x, y, imageWidthHUY, imageHeightHUY);
      const img_trangthai = new Image();
      img_trangthai.src = huyHoadon; // hoặc base64 string

      // lấy lại tâm trang
      const centerXLydoHuy = pageWidth / 2; // Tâm ngang trang
      doc.addFont("OpenSans-Bold-normal.ttf", "OpenSans-Bold", "bold");
      doc.setFont("OpenSans-Bold", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#ff0000");
      doc.text(`Lý do hủy biên lai: ${data.lydohuy}`, centerXLydoHuy, y + 75, {
        align: "center",
        fontWeight: "bold",
      });
      doc.text(`Người hủy: ${data.nguoihuybienlai}`, centerXLydoHuy, y + 80, {
        align: "center",
        fontWeight: "bold",
      });
      doc.text(`Ngày hủy: ${data.ngayhuybienlai}`, centerXLydoHuy, y + 85, {
        align: "center",
        fontWeight: "bold",
      });

      // img.onload = () => {
      //   console.log("✅ Ảnh đã load xong");
      //   doc.addImage(img, "PNG", x, y, imageWidth, imageHeight);
      //   console.log("➡️ Đã add image");
      // };

      // img.onerror = (err) => {
      //   console.error("❌ Lỗi load ảnh:", err);
      // };

      // add the font to jsPDF
      doc.addFont("OpenSans-Bold-normal.ttf", "OpenSans-Bold", "bold");
      doc.setFont("OpenSans-Bold", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#04368c");
      doc.text(`${company.bhxhName}`, 60, 10, {
        align: "center",
        fontWeight: "bold",
      });

      doc.setFontSize(12);
      doc.setTextColor("ff0000");
      doc.text(`${company.companyName}`, 60, 17, {
        align: "center",
        fontWeight: "bold",
      });

      // Đặt màu cho đường line (gạch chân)
      doc.setDrawColor(248, 215, 218);
      doc.setLineWidth(0.4); // Độ dày đường gạch

      const y_line = 19; // Vị trí theo chiều dọc

      // Di chuyển sang trái nhiều hơn và rút ngắn chiều dài
      const x1 = 40; // điểm bắt đầu (trái)
      const lineLength = 42; // chiều dài line
      const x2 = x1 + lineLength;
      doc.line(x1, y_line, x2, y_line);

      doc.addFont("OpenSans-Bold-normal.ttf", "OpenSans-Bold", "bold");
      doc.setFont("OpenSans-Bold", "bold");
      doc.setFontSize(10);
      doc.setTextColor("#04368c");
      doc.text(`Mẫu số: C45-BB `, 173, 11, {
        align: "center",
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans_SemiCondensed-Italic-normal.ttf",
        "OpenSans_SemiCondensed-Italic-normal",
        "italic"
      );
      doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
      doc.setFontSize(9);
      doc.setTextColor("#04368c");
      doc.text(`(Ban hành kèm theo Thông tư số 107/2017/TT-BTC `, 175, 15, {
        align: "center",
        fontWeight: "bold",
      });
      doc.text(`ngày 10/10/2017 của Bộ Tài chính) `, 175, 19, {
        align: "center",
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(20);
      doc.setTextColor("#dc143c");
      doc.text(`BIÊN LAI THU TIỀN `, 105, 35, {
        align: "center",
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans_SemiCondensed-Italic-normal.ttf",
        "OpenSans_SemiCondensed-Italic-normal",
        "italic"
      );
      doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
      doc.setFontSize(9);
      doc.setTextColor("#00008b");
      doc.text(
        `Do ${company.companyNameThuong}, tổ chức được Bảo hiểm xã hội uỷ quyền thu phát hành. `,
        105,
        41,
        {
          align: "center",
          fontWeight: "bold",
        }
      );

      const ngayBienLai = data.ngaybienlai.split(" ")[0];
      doc.setFontSize(9);
      doc.setTextColor("#00008b");
      doc.text(`Ngày: `, 155, 50, {
        fontWeight: "bold",
      });
      doc.text(`${ngayBienLai}`, 165, 50, {
        fontWeight: "bold",
      });

      const year = data.ngaybienlai.split("-")[2].split(" ")[0];

      doc.text(`Ký hiệu: `, 155, 55, {
        fontWeight: "bold",
      });
      doc.text(`${data.maloaihinh}-${data.maDaiLy}-${year}`, 165, 55, {
        fontWeight: "bold",
      });

      doc.text(`Số: `, 155, 60, {
        fontWeight: "bold",
      });
      doc.text(`${data.sobienlai}`, 165, 60, {
        fontWeight: "bold",
      });

      doc.addImage(qrcode, "PNG", 165, 25, 15, 15);
      //font-times-new-roman-normal
      const toadoXInfo = 10;
      const toadoYInfo = 60;
      doc.addFont(
        "Times New Roman Bold-normal.ttf",
        "Times New Roman Bold-normal",
        "bold"
      );
      doc.setFont("Times New Roman Bold-normal", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#04368c");
      doc.text(`Họ và tên người nộp:`, toadoXInfo, toadoYInfo, {
        fontWeight: "bold",
      });
      doc.text(
        `${data.hoTen} - Mã số BHXH: ${data.maSoBhxh}`,
        toadoXInfo + 43,
        toadoYInfo,
        {
          fontWeight: "bold",
        }
      );

      const diachi = data.tenquanhuyen + "; " + data.tentinh;
      // data.tothon + "; " +

      doc.text(`Địa chỉ: `, toadoXInfo, toadoYInfo + 8, {
        fontWeight: "bold",
      });
      doc.text(`${diachi}`, toadoXInfo + 16, toadoYInfo + 8, {
        fontWeight: "bold",
      });

      var noidungText = "";

      if (
        data.maloaihinh == "AR" ||
        data.maloaihinh == "BI" ||
        data.maloaihinh == "WI"
      ) {
        noidungText = `Tiền đóng BHYT, phương thức đóng ${data.soThang} tháng, từ ngày ${data.tuNgay} đến ngày ${data.denNgay}`;
      } else {
        if (data.maphuongan !== "DB") {
          noidungText = `Tiền đóng BHXH Tự nguyện, phương thức đóng ${data.soThang} tháng, từ ngày ${data.tuThang} đến ngày ${data.denThang}`;
        } else {
          noidungText = `BHXH Tự nguyện, ${data.tenphuongthucdong}, ${data.sothang} tháng, từ tháng ${data.tuThang}`;
        }
      }
      doc.text(`Nội dung: `, toadoXInfo, toadoYInfo + 16, {
        fontWeight: "bold",
      });
      doc.text(`${noidungText}`, toadoXInfo + 20, toadoYInfo + 16, {
        fontWeight: "bold",
      });

      const formattedMoney = Number(data.soTien).toLocaleString("vi-VN");
      // console.log(formattedMoney);

      doc.text(`Số tiền thu: `, toadoXInfo, toadoYInfo + 24, {
        fontWeight: "bold",
      });
      doc.text(`${formattedMoney}`, toadoXInfo + 24, toadoYInfo + 24, {
        fontWeight: "bold",
      });

      doc.text(`(Loại tiền): VNĐ `, toadoXInfo + 100, toadoYInfo + 24, {
        fontWeight: "bold",
      });

      let tienbangchuText = num2words(data.soTien);
      let tienHoa = this.capitalizeFirstLetter(tienbangchuText);
      tienHoa += " đồng./.";

      doc.text(`(Viết bằng chữ: ${tienHoa}) `, toadoXInfo, toadoYInfo + 32, {
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(13);
      doc.setTextColor("#04368c");
      doc.text(`NGƯỜI NỘP TIỀN`, toadoXInfo + 20, toadoYInfo + 43, {
        fontWeight: "bold",
      });

      doc.text(`NGƯỜI THU TIỀN`, toadoXInfo + 120, toadoYInfo + 43, {
        fontWeight: "bold",
      });

      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#04368c");
      doc.text(`${data.hoTen}`, toadoXInfo + 40, toadoYInfo + 75, {
        fontWeight: "bold",
        align: "center",
      });

      // doc.setFontSize(8);
      // doc.setTextColor("#dc3545");
      // doc.text(
      //   `Đã được ký bởi: ${company.companyName}`,
      //   toadoXInfo + 106,
      //   toadoYInfo + 53,
      //   {
      //     fontWeight: "bold",
      //   }
      // );
      // doc.text(
      //   `Ngày ký: ${ngayBienLai}`,
      //   toadoXInfo + 124,
      //   toadoYInfo + 58,
      //   {
      //     fontWeight: "bold",
      //   }
      // );

      doc.addFont(
        "OpenSans-ExtraBold-normal.ttf",
        "OpenSans-ExtraBold-normal",
        "bold"
      );
      doc.setFont("OpenSans-ExtraBold-normal", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#04368c");

      // Tâm mong muốn theo trục X
      const centerX = toadoXInfo + 128;
      doc.text(`${data.nguoithutien}`, centerX + 11, toadoYInfo + 75, {
        align: "center",
      });

      doc.addFont(
        "OpenSans_SemiCondensed-Italic-normal.ttf",
        "OpenSans_SemiCondensed-Italic-normal",
        "italic"
      );
      doc.setFont("OpenSans_SemiCondensed-Italic-normal", "italic");
      doc.setFontSize(8);
      doc.setTextColor("#04368c");
      doc.text(
        `Vui lòng tra cứu biên lai điện tử tại: `,
        toadoXInfo + 54,
        toadoYInfo + 82,
        {
          fontWeight: "bold",
        }
      );

      doc.setFontSize(8);
      doc.setTextColor("#dc143c");
      doc.text(
        `${company.urlBienlaidientu}`,
        toadoXInfo + 92,
        toadoYInfo + 82,
        {
          fontWeight: "bold",
        }
      );

      const tenbienlai = data.urlNameInvoice;

      const pdfBlob = doc.output("blob");

      const formData = new FormData();
      formData.append("pdf", pdfBlob, `${tenbienlai}.pdf`);

      // Gửi về backend
      await this.$axios.post("/api/kekhai/upload-bienlai-huy", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

    capitalizeFirstLetter(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style scoped lang="css">
@import "@/assets/customCss/common.css";
@import "@/assets/customCss/footerTable.css";

.pagination {
  margin-top: 1em;
}

.is-disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}

/* Mặc định cho thiết bị di động */
.modal-card-predata {
  max-height: 80vh; /* Chiều cao tối đa là 80% màn hình */
  overflow-y: auto; /* Cho phép cuộn nếu nội dung quá dài */
}

/* Cho thiết bị máy tính */
@media (min-width: 1024px) {
  .modal-card-predata {
    max-height: 90vh; /* Tăng chiều cao tối đa cho máy tính */
  }
}
</style>