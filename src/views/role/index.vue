<template>
  <div id="role">
    <div class="query" v-show="queryVisible">
      {{pageInfo.condition}}
      <el-form ref="queryForm" :model="pageInfo.condition" label-width="80px" size="mini">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色名称">
              <el-input v-model.trim="pageInfo.condition.name" style="width: 240px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属单位">
              <el-input v-model.trim="pageInfo.condition.unitName" style="width: 240px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="pageInfo.condition.createTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :unlink-panels="true"
                :editable="false"
                value-format="timestamp">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型">
              <el-radio-group v-model="pageInfo.condition.type">
                <el-radio :label="'all'">全部</el-radio>
                <el-radio :label="'true'">系统预置</el-radio>
                <el-radio :label="'false'">自定义</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="pageInfo.condition.status">
                <el-radio :label="'all'">全部</el-radio>
                <el-radio :label="'true'">启用</el-radio>
                <el-radio :label="'false'">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="queryByCondition">查询</el-button>
            <el-button @click="queryVisible = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-button icon="el-icon-plus" type="primary" size="small" @click="addRole">添加</el-button>
      <el-button
        icon="el-icon-delete" type="danger" size="small" 
        :disabled="selectRow.length <= 0"
        @click="deleteRoleBatchByIds(selectRow)">
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
          prop="name"
          label="角色名称"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="permChar"
          label="权限字符"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="unitId"
          label="所属单位">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="更新时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人">
        </el-table-column>
        <el-table-column
          label="类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 0" type="danger" size="small">系统预置</el-tag>
            <el-tag v-else type="warning" size="small">自定义</el-tag>
          </template>
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
              
              @click.native.prevent="changeStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editRole(scope.$index, scope.row)"
              type="success">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteRole(scope.$index, scope.row)">删除</el-button>
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
    <!-- 给 div 加上 if 是为了取消 dialog 缓存，让它每次都重新渲染 -->
    <div v-if="dialogVisible">
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" top="8vh" width="30%"
        destroy-on-close>
        <div class="form-wrapper">
          <el-form label-width="80px" :model="newRoleInfo" size="small">
            <el-form-item label="角色名称">
              <el-input v-model="newRoleInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="权限字符">
              <el-input v-model="newRoleInfo.permChar"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio v-model="newRoleInfo.enable" :label="true">启用</el-radio>
              <el-radio v-model="newRoleInfo.enable" :label="false">停用</el-radio>
            </el-form-item>
            <el-form-item label="菜单权限">
              <div>
                <el-checkbox @change="toggleExpandAll">展开/折叠</el-checkbox>
                <el-checkbox @change="toggleTree">全选/全不选</el-checkbox>
              </div>
              <el-tree
                ref="tree"
                :data="allMenus"
                :props="defaultProps"
                show-checkbox
                highlight-current
                node-key="id"
                :default-checked-keys="checkedKeys"
                :empty-text="'暂无菜单数据'"
                class="tree-border">
              </el-tree>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="newRoleInfo.description"></el-input>
            </el-form-item>
          </el-form>
          
        </div>
        
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="saveOrUpdate">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {getAllRoles, deleteRoleBatchByIds, deleteRoleById, updateRoleStatus} from 'api/role'
  import {getMenuByRoleId, getAllMenus} from 'api/menu'
  import {updateRoleAndMenu, addRoleAndMenu} from 'api/app'

  import {Page} from 'obj/Page'
  import {RoleBO} from 'obj/AppBO'

  import {messageDuration} from '@/settings'

  export default {
    computed: {
      computeIndex() {

      }
    },
    data() {
      return {
        // 分页信息
        pageInfo: new Page(),
        // 表格是否正加载
        loading: false,
        // 添加或编辑的 dialog 是否显示
        dialogVisible: false,
        // dailog 的标题
        dialogTitle: '添加角色',
        // 编辑界面的默认信息
        newRoleInfo: {},
        // 树形空间的 children 和 label
        defaultProps: {
          children: 'children', 
          label: 'name'
        },
        // 所有菜单
        allMenus: [],
        // 用户原先拥有的菜单
        checkedKeys: [],
        // 用户新的菜单
        newCheckedKeys: [],
        // 被选中的单元格
        selectRow: [],
        // 是否显示高级查询
        queryVisible: false,
        // 是否已经改变页码 changeCurrent、prevPage、nextPage 事件冲突
        pageIsChange: false,
        // 是否展开所有的树形
        expandAll: false,
        // 是否全选菜单
        selectAllTree: false
      }
    },
    created() {
      this.pageInfo.condition.type = 'all'
      this.pageInfo.condition.status = 'all'
    },
    mounted() {
      this.getAllRoles()
    },
    methods: {
      getAllRoles() {
        this.loading = true
        this.pageIsChange = true
        getAllRoles(this.pageInfo).then(res => {
          Object.assign(this.pageInfo, res.data)
          this.loading = false
          this.pageIsChange = false
        }, err => {
          this.loading = false
          this.pageIsChange = false
          console.error(err)
        })
      },
      changeSelection(row) {
        this.selectRow = row
      },
      changeStatus(data) {
        let text = data.enable ? '启用' : '停用'
        this.$confirm('确认要 [' + text + '] ' + data.name + ' 吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return updateRoleStatus(data.id, data.enable)
        }).then(() => {
          this.msgSuccess(text + "成功")
          this.getAllRoles(this.pageInfo)
        }).catch((err) => {
          console.error(err)
          data.enable = !data.enable
        })
      },
      changeSize(size) {
        this.pageInfo.page = 1
        this.pageInfo.size = size
        this.getAllRoles(this.pageInfo)
      },
      changeCurrent(page) {
        if (!this.pageIsChange) {
          this.pageInfo.page = page
          this.getAllRoles(this.pageInfo)
        }
      },
      prevPage(page) {
        if (!this.pageIsChange) {
          this.pageInfo.page = page
          this.getAllRoles(this.pageInfo)
        }
      },
      nextPage(page) {
        if (!this.pageIsChange) {
          this.pageInfo.page = page
          this.getAllRoles(this.pageInfo)
        }
      },
      // 默认选中的菜单, 如果直接在里面使用 data 函数中的数据会造成结果不正确
      initCheckedMenu(data) {
        let result = []
        const init = function(data) {
          for(let i = 0; i < data.length; i++) {
            let e = data[i]
            if((!e.children || e.children.length <= 0) && e.level != 1){
              console.log(e.level)
              result.push(e.id)
            } else {
              init(e.children)
            }
          }
        }
        init(data)
        return result
      },
      editRole(index, data) {
        this.dialogTitle = '修改角色'
        Promise.all([
          new Promise((resolve,reject) => {
            getMenuByRoleId(data.id).then(res => {
              resolve(res.data)
            }, err => {
              reject(err)
            })
          }),
          new Promise((resolve,reject) => {
            getAllMenus().then(res => {
              resolve(res.data)
            }, err => {
              reject(err)
            })
          })
        ]).then(res => {
          console.log(res)
          this.dialogVisible = true
          this.newRoleInfo = Object.assign({}, data)
          // this.$set(this.newRoleInfo, 'menu', res[0])
          this.allMenus = res[1]
          this.checkedKeys = res[0].map(e => e['id'])
          console.log(res[0])
          this.checkedKeys =  this.initCheckedMenu(res[0])

        }, err => {
          console.log(err)
        })
      },
      addRole() {
        this.dialogTitle = '添加角色'
        this.dialogVisible = true
        // 清理缓存，防止点击编辑之后再点击添加按钮出现数据污染
        this.newRoleInfo = {enable: true}
        this.allMenus = []
        this.checkedKeys = []
        getAllMenus().then(res => {
          this.allMenus = res.data
        }, err => {
          console.log(err)
        })
      },
      deleteRole(index, role) {
        if (role.type === 0) {
          this.$alert('系统预置角色无法删除!', '警告', {
            confirmButtonText: '确定',
            type: 'error',
            callback: action => {
              return
            }
          })
        } else {
          this.$confirm('是否要删除该角色?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteRoleById(role.id).then(res => {
              this.getAllRoles(this.pageInfo)
              this.$message({
                type: 'success',
                message: '删除成功!',
                duration: messageDuration
              })
            }, err => {
              console.error(err)
            })
          }).catch(() => {
                  
          })
        }
      },
      deleteRoleBatchByIds(selectRow = []) {
        let innerRole = selectRow.filter(e => e.type === 0)
        if (innerRole.length > 0) {
          this.$alert('所选内容包含系统预置角色, 无法删除!', '警告', {
            confirmButtonText: '确定',
            type: 'error',
            callback: action => {
              return
            }
          })
        } else {
          this.$confirm('是否要删除所选角色?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let ids = selectRow.map(e => e['id'])
            deleteRoleBatchByIds(ids).then(res => {
              this.getAllRoles(this.pageInfo)
              this.$message({
                type: 'success',
                message: '批量删除成功',
                duration: messageDuration
              })
            }, err => {
              console.err(err)
            })
          }).catch(() => {
                  
          })
        }
      },
      saveOrUpdate() {
        this.newCheckedKeys = this.$refs.tree.getCheckedNodes(false, true).map(e => e.id)
        let roleBO = new RoleBO(this.newRoleInfo, this.newCheckedKeys)
        if (this.dialogTitle === '修改角色') {
          updateRoleAndMenu(roleBO).then(res => {
            this.dialogVisible = false
            this.msgSuccess('修改成功')
            this.getAllRoles(this.pageInfo)
          }, err => {
            console.error(err)
          })
        } else if (this.dialogTitle === '添加角色') {
          addRoleAndMenu(roleBO).then(res => {
            this.dialogVisible = false
            this.msgSuccess('添加成功')
            this.getAllRoles(this.pageInfo)
          }, err => {
            console.error(err)
          })
        }
        
      },
      toggleExpandAll(checked) {
        let nodes=this.$refs.tree.store.nodesMap
        for(let i in nodes){
            nodes[i].expanded=checked
        }
      },
      toggleTree(checked) {
        this.$refs.tree.setCheckedNodes(checked ? this.allMenus : [])
      },
      queryByCondition() {
        this.getAllRoles(this.pageInfo)
      }
    }
  }
</script>

<style scoped>
 .footer-page {
   display: flex;
   flex-direction: row-reverse;
 }
 .tree-border {
   padding: 12px 0;
   border: 1px solid #e5e6e7;
   border-radius: 4px;
 }
</style>