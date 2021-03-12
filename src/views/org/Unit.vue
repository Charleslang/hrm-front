<template>
  <div id="unit-wrapper">
    <div class="query" v-show="queryVisible">
      {{pageInfo.condition}}
      <el-form ref="queryForm" :model="pageInfo.condition" label-width="80px" size="mini">
        <el-form-item label="公司名称">
          <el-input v-model.trim="pageInfo.condition.name"></el-input>
        </el-form-item>
        <el-form-item label="公司简称">
          <el-input v-model.trim="pageInfo.condition.shortName"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model.trim="pageInfo.condition.header"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="pageInfo.condition.createTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :unlink-panels="true"
            :editable="false"
            value-format="timestamp"
            :picker-options="pickerop">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-date-picker
            v-model="pageInfo.condition.modifyTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :unlink-panels="true"
            :editable="false"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="pageInfo.condition.status">
            <el-radio :label="'all'">全部</el-radio>
            <el-radio :label="'true'">启用</el-radio>
            <el-radio :label="'false'">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="queryByCondition">查询</el-button>
          <el-button @click="queryVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button icon="el-icon-plus" type="primary" size="small" @click="addUnit">添加</el-button>
      <el-button
        icon="el-icon-delete" type="danger" size="small" 
        :disabled="selectRow.length <= 0"
        @click="deleteUnitBatchByIds(selectRow)">
        批量删除
      </el-button>
      <el-button icon="el-icon-search" type="primary" size="small" @click="queryVisible = !queryVisible">高级查询</el-button>
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
          prop="unit.name"
          label="名称"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="unit.shortName"
          label="简称">
        </el-table-column>
        <el-table-column
          prop="user.name"
          label="负责人"
          :formatter="formatUnitHeader">
        </el-table-column>
        <el-table-column
          prop="unit.createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="unit.modifyTime"
          label="更新时间">
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <el-switch
              :width="50"
              v-model="scope.row.unit.enable"
              active-color="#13ce66"
              inactive-color="#DCDFE6"
              active-text="启用"
              inactive-text="停用"
              :disabled="true"
              @click.native.prevent="changeStatus(scope.row.unit)">
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
              @click="deleteUnit(scope.$index, scope.row.unit)">删除</el-button>
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
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" top="8vh" width="50%"
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
  import {getAllUnit, deleteUnitById, deleteUnitByIds, updateUnitStatus} from 'api/unit'
  import {updateUnitAndUser, addUnitAndUser} from 'api/app'

  import {Page} from '@/obj/Page'
  import {UnitBO} from '@/obj/AppBO'

  import EditUnit from './components/EditUnit'

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
        loading: false,
        queryForm: {
          name: '',
          shortName: '',
          header: '',
          createTime: '',
          modifyTime: '',
          status: 'all'
        },
        queryVisible: false,
        pickerop: {
          onPick(max, min) {
            console.log(max , min)
            console.log(this.queryForm)
          }
        }
      }
    },
    computed: {
      dialogTitle() {
        return Object.keys(this.unitInfo).length > 0 ? '编辑单位' : '添加单位'
      }
    },
    created() {
      this.pageInfo.condition = Object.assign({}, this.queryForm)
    },
    mounted() {
      this.initUnit(this.pageInfo)
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
      initUnit(pageInfo) {
        this.hasChangePage = true
        this.loading = true
        getAllUnit(pageInfo).then(res => {
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
        Object.assign(this.unitInfo, data.unit)
        Object.assign(this.adminInfo, data.user)
        this.$nextTick(() => {

          console.log(this.$refs.edit.$refs.form)
        })
      },
      deleteUnit(index, data) {
        console.log(index + '' , data)
        this.$confirm('此操作将永久删除该记录,不可恢复,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          deleteUnitById(data.id).then(res => {
            this.initUnit(this.pageInfo)
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: messageDuration
            })
          }, err => {
            console.log(err)
          })
        }).catch(() => {         
        })
      },
      deleteUnitBatchByIds(selectRow) {
        this.$confirm('确定删除所选记录, 删除后不可恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          let ids = selectRow.map(e => e.unit.id)
          deleteUnitByIds(ids).then(res => {
            this.initUnit(this.pageInfo)
            this.$message({
              type: 'success',
              message: '批量删除成功!'
            })
          }, err => {
            console.log(err)
          })
        }).catch(() => {         
        })
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
            if (this.dialogTitle === '编辑单位') {
              console.log('都通过了')
              delete this.adminInfo.password2
              let unitBO = new UnitBO(this.$refs.edit.$refs.unitForm.model, this.$refs.edit.$refs.userForm.model)
              updateUnitAndUser(unitBO).then(res => {
                this.dialogFormVisible = false
                this.initUnit(this.pageInfo)
                this.$message({
                  type: 'success',
                  message: '更新成功',
                  duration: messageDuration
                })
              }, err => {
                console.error(err)
              })
            } else {
              delete this.adminInfo.password2
              let unitBO = new UnitBO(this.$refs.edit.$refs.unitForm.model, this.$refs.edit.$refs.userForm.model)
              addUnitAndUser(unitBO).then(res => {
                this.dialogFormVisible = false
                this.initUnit(this.pageInfo)
                this.$message({
                  type: 'success',
                  message: '添加成功',
                  duration: messageDuration
                })
              }, err => {
                console.log(err)
              })
            }
            
            // this.dialogFormVisible = false
          })
          
        // })
      },
      changeStatus(unit) {
        console.log(unit)
        let msg = !unit.enable ? '启用' : '停用'
        this.$confirm('是否' + msg + '该单位?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('hh')
          updateUnitStatus(unit.id, !unit.enable).then(res => {
            this.initUnit(this.pageInfo)
            this.$message({
              type: 'success',
              message: '已' + msg,
              duration: messageDuration
            })
          }, err => {
            console.log(err)
          })
        }).catch(() => {         
        })
      },
      changeSelection(value) {
        // Object.assign(this.selectRow, value)
        this.selectRow = value
        console.log(this.selectRow)
      },
      prevPage(page) {
        this.pageInfo.page = page
        console.log(this.pageInfo)
        this.initUnit(this.pageInfo)
      },
      nextPage(page) {
        this.pageInfo.page = page
        console.log(this.pageInfo)
        this.initUnit(this.pageInfo)
      },
      changeSize(pageSize) {
        this.pageInfo.page = 1
        this.pageInfo.size = pageSize
        console.log(this.pageInfo)
        this.initUnit(this.pageInfo)
      },
      changeCurrent(currPage) {
        if (!this.hasChangePage) {
          console.log(this.pageInfo)
          this.pageInfo.page = currPage
          this.initUnit(this.pageInfo)
        }
      },
      computeIndex(index) {
        return (this.pageInfo.page - 1) * this.pageInfo.size + index + 1
      },
      queryByCondition() {
        this.initUnit(this.pageInfo)
      }
    } 
  }
</script>

<style scoped>
  #unit-wrapper {
    width: 100%;
  }
 .footer-page {
   background-color: #ffffff;
   display: flex;
   flex-direction: row-reverse;
 }
 .form-wrapper {
   height: 56vh;
   width: 100%;
 }
 #unit-wrapper .el-input {
   width: 210px;
 }
</style>