<template>
  <div>
    <div v-for="(item, index) in menuList" :key="index">
      <template v-if="!item.hidden">
        <el-submenu :index="resolvePath(item.path)" v-if="item.children && item.children.length > 0"> 
          <template v-slot:title>
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <side-menu :menu-list="item.children" :base-path="resolvePath(item.path)"/>
        </el-submenu>
        <el-menu-item :index="resolvePath(item.path)" v-else @click="onMenuItemClick(item)">
          <template v-slot:title>
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
        </el-menu-item>
      </template>
    </div>
  </div>
</template>

<script>
  import path from 'path'

  export default {
    name: 'SideMenu',
    props: {
      menuList: {
        type: Array,
        default() {
          return []
        }
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    methods: {
      onMenuItemClick(menu) {
        console.log(menu)
      },
      resolvePath(routePath) {
        return path.resolve(this.basePath, routePath)
      }
    }
  }
</script>

<style>

</style>