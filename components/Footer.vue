<template>
  <footer class="footer">
    <div class="container">
      <div
        class="columns is-align-items-center is-justify-content-space-between"
      >
        <!-- Cột trái -->
        <div class="column has-text-centered">
          <div class="footer-row">
            <img
              src="@/assets/logos/an-sinh-bhxh-high-resolution-logo-black-transparent (1).png"
              alt="Your Image"
              width="120"
              height="40"
            />
          </div>
          <div class="footer-row">
            <span>let's Start</span>
          </div>
        </div>

        <!-- Cột giữa -->
        <div class="column has-text-centered">
          <div class="footer-row">
            <span>
              Designed & Developed by
              <span class="highlighted">司.馬.懿</span>
            </span>
          </div>
          <div class="footer-row">
            <span>Copyright from @2023</span>
          </div>
        </div>

        <!-- Cột phải -->
        <div class="column has-text-centered">
          <div class="footer-row icons">
            <i class="fab fa-facebook"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-instagram"></i>
          </div>
          <div class="footer-row">
            <span>Chắp cánh sứ mệnh An sinh Xã hội</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f0f0f0;
  padding: 20px 0;
  font-size: small;
  font-weight: 700;
}

.columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-row {
  margin-bottom: 10px;
}

.highlighted {
  font-weight: 900;
  color: #f96854;
}

.icons i {
  font-size: 20px;
  margin: 0 8px;
}
</style>
