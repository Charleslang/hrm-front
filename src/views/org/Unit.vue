<template>
  <div id="unit-wrapper">
    <div>
      <el-button icon="el-icon-plus" type="primary" size="small" @click="addUnit">添加</el-button>
      <el-button icon="el-icon-delete" type="danger" size="small" :disabled="selectRow.length <= 0">批量删除</el-button>
    </div>
    <div class="content-wrapper">
      <el-table
        v-loading="loading"
        :data="pageInfo.data"
        border
        style="width: 100%"
        @selection-change="changeSelection">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="#"
          type="index"
          :index="computeIndex">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="shortName"
          label="简称">
        </el-table-column>
        <el-table-column
          prop="userAdminVO.name"
          label="负责人"
          :formatter="formatUnitHeader">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="更新时间">
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <el-switch
              :width="50"
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#DCDFE6"
              active-text="启用"
              inactive-text="停用"
              @change="changeStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editUnit(scope.$index, scope.row)"
              type="success">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteUnit(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer-page">
      <el-pagination
        background
        @size-change="changeSize"
        @current-change="changeCurrent"
        @prev-click="prevPage"
        @next-click="nextPage"
        :current-page="pageInfo.page"
        :page-sizes="pageInfo.sizes"
        :page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
    <div v-if="dialogFormVisible">
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible" top="8vh" width="50%"
        destroy-on-close
        @opened="openDialog" 
        @close="closeDialog">
        <div class="form-wrapper">

          <edit-unit ref="edit" :unit="unitInfo" :admin="adminInfo"/>
        </div>
        
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog" size="small">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {getAllUnit} from 'api/unit'
  import {Page} from '@/obj/Page'

  import EditUnit from './components/EditUnit'

  import {updateUnitAndUser} from 'api/app'

  import {messageDuration} from '@/settings'

  export default {
    components: {
      EditUnit
    },
    data() {
      return {
        pageInfo: new Page(),
        status: false,
        selectRow: [],
        hasChangePage: false,
        dialogFormVisible: false,
        unitInfo: {},
        adminInfo: {},
        loading: false
      }
    },
    computed: {
      
    },
    mounted() {
      this.initUnit(this.pageInfo.page, this.pageInfo.size)
    },
    methods: {
      formatUnitHeader(row, column, cellValue, index) {
        return cellValue ? cellValue : '-'
      },
      openDialog() {
        console.log(this.$refs.edit.$refs.form)
      },
      closeDialog() {
        this.dialogFormVisible = false
        this.unitInfo = {}
        this.adminInfo = {}
      },
      initUnit(page, size) {
        this.hasChangePage = true
        this.loading = true
        getAllUnit(page, size).then(res => {
          Object.assign(this.pageInfo, res.data)
          this.hasChangePage = false
          this.loading = false
        }, err => {
          this.loading = false
          console.error(err)
        })
      },
      addUnit() {
        this.dialogFormVisible = true
      },
      editUnit(index, data) {
        console.log(index + '' , data)
        this.dialogFormVisible = true
        Object.assign(this.unitInfo, data)
        Object.assign(this.adminInfo, data.userAdminVO)
        this.$nextTick(() => {

          console.log(this.$refs.edit.$refs.form)
        })
      },
      deleteUnit(index, data) {
        console.log(index + '' , data)
      },
      saveOrUpdate() {
        // this.$nextTick(() => {
          console.log(this.$refs.edit.$refs.unitForm)
          const form = this.$refs.edit
          Promise.all([
            new Promise((resolve, reject) => {
              form.$refs.unitForm.validate(valid => {
                if (valid) {
                  resolve()
                } else {
                  return false
                }
              })
            }),
            new Promise((resolve, reject) => {
              form.$refs.userForm.validate(valid => {
                if (valid) {
                  resolve()
                } else {
                  return false
                }
              })
            })
          ]).then(res => {
            console.log('都通过了')
            delete this.adminInfo.password2
            updateUnitAndUser(this.unitInfo, this.adminInfo).then(res => {
              this.dialogFormVisible = false
              this.initUnit()
              this.$message({
                type: 'success',
                message: '更新成功',
                duration: messageDuration
              })
            }, err => {
              console.error(err)
            })
            // this.dialogFormVisible = false
          })
          
        // })
      },
      changeStatus(value) {
        console.log(value)
      },
      changeSelection(value) {
        // Object.assign(this.selectRow, value)
        this.selectRow = value
        console.log(this.selectRow)
      },
      prevPage(page) {
        this.initUnit(page, this.pageInfo.size)
      },
      nextPage(page) {
        this.initUnit(page, this.pageInfo.size)
      },
      changeSize(pageSize) {
        this.pageInfo.size = pageSize
        this.initUnit(1, pageSize)
      },
      changeCurrent(currPage) {
        if (!this.hasChangePage) {
          this.initUnit(currPage, this.pageInfo.size)
        }
      },
      computeIndex(index) {
        return (this.pageInfo.page - 1) * this.pageInfo.size + index + 1
      }
    } 
  }
</script>

<style scoped>
 .footer-page {
   background-color: #ffffff;
   display: flex;
   flex-direction: row-reverse;
 }
 .form-wrapper {
   height: 56vh;
   width: 100%;
 }
</style>