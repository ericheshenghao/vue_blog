<template>
  <div v-drag="`left`" class="search__box">
    <input class="search__txt" type="text" name placeholder="Type to search" />
    <a class="search__btn" href="#">
      <i class="fa fa-search" style="font-size:8px"></i>
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.search__box {
  position: absolute;
  top: 20%;
  left: 0%;
//   transform: translate(-50%, -50%);
  background: #2f3640;
  height: 40px/2;
  border-radius: 40px/2;
  padding: 10px/2 15px/2 10px/2 15px/2;
}

.search__box:hover > .search__txt {
  width: 240px/2;
  padding: 0 6px/2;
}

.search__box:hover > .search__btn {
  background: #fff;
}
.search__box:hover > .search__btn i {
  color: #34ace0;
  transition: 0.9s;
}

.search__btn {
  color: #e84118;
  float: right;
  width: 40px/2;
  height: 40px/2;
  border-radius: 50%;
  background: #34ace0;
  display: flex;
  justify-content: center;
  align-item: center;
  text-decoration: none;
}
.search__btn i {
  line-height: 40px/2;
  color: #fff;
  transition: 0.9s;
}

.search__txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: #fff;
  font-size: 16px/2;
  transition: 0.2s;
  line-height: 40px/2;
  width: 0;
}
</style>