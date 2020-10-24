<template>
  <div id="components-modal-demo-position">
    <a-modal
      title="非通用查询配置"
      centered
      :width="800"
      :visible="modal1Visible"
      @ok="handleOk"
      @cancel="handleCancle"
    >
      <a-form-model
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="formItems"
      >
        <a-form-model-item :label="formItems.modelName.label">
          <a-input
            v-model="formItems.modelName.value"
            :placeholder="formItems.modelName.placeholder"
          />
        </a-form-model-item>

        <a-form-model-item :label="formItems.delimiter.label">
          <a-input
            v-model="formItems.delimiter.value"
            :placeholder="formItems.delimiter.placeholder"
          />
        </a-form-model-item>

        <a-form-model-item :label="formItems.keys.label">
          <a-input
            v-for="(item, index) in formItems.keys.value"
            :key="index + 1"
            v-model="formItems.keys.value[index]"
            :placeholder="formItems.keys.placeholder"
            style="width: 20%; margin-right: 8px"
          />
          <a-icon
            v-if="formItems.keys.value.length > 1"
            class="dynamic-button"
            type="minus-circle-o"
            :disabled="formItems.keys.value.length === 1"
            @click="removeKey"
          />
          <a-icon class="dynamic-button" type="plus-circle-o" @click="addKey" />
        </a-form-model-item>

        <a-form-model-item :label="formItems.values.label">
          <a-input
            v-for="(item, index) in formItems.values.value"
            :key="index + 1"
            v-model="formItems.values.value[index]"
            :placeholder="formItems.values.placeholder"
            style="width: 20%; margin-right: 8px"
          />
          <a-icon
            v-if="formItems.values.value.length > 1"
            class="dynamic-button"
            type="minus-circle-o"
            :disabled="formItems.values.value.length === 1"
            @click="removeValue"
          />
          <a-icon
            class="dynamic-button"
            type="plus-circle-o"
            @click="addValue"
          />
        </a-form-model-item>

        <a-form-model-item :label="formItems.conditions.label">
          <template v-for="(item, index) in formItems.conditions.value">
            <div :key="index + 1">
              <a-input
                v-model="formItems.conditions.value[index].column"
                placeholder="请输入列名"
                style="width: 26%; margin-right: 8px"
              />
              <a-select
                v-model="formItems.conditions.value[index].condition"
                placeholder="请选择条件"
                style="width: 26%; margin-right: 8px"
              >
                <a-select-option
                  v-for="(con, i) in conditions"
                  :key="i + 1"
                  :value="con"
                >
                  {{ con }}
                </a-select-option>
              </a-select>
              <a-input
                v-model="formItems.conditions.value[index].v1"
                placeholder="请输入值"
                style="width: 26%; margin-right: 8px"
              />
              <a-icon
                v-if="formItems.conditions.value.length > 1"
                class="dynamic-button"
                type="minus-circle-o"
                :disabled="formItems.conditions.value.length === 1"
                @click="removeCondition(item)"
              />
              <a-icon
                class="dynamic-button"
                type="plus-circle-o"
                @click="addCondition(item)"
              />
            </div>
          </template>
        </a-form-model-item>

        <a-form-model-item :label="formItems.limit.label">
          <a-input
            v-model="formItems.limit.value"
            :placeholder="formItems.limit.placeholder"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      conditions: ["andEq", "andLike"],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      modal1Visible: false,
      formItems: {
        modelName: {
          value: "",
          placeholder: "请输入model的名字",
          label: "model名",
        },
        delimiter: {
          value: "",
          placeholder: "请输入分隔符",
          label: "分隔符",
        },
        keys: {
          value: [""],
          placeholder: "请输入key",
          label: "键",
        },
        values: {
          value: [""],
          placeholder: "请输入value",
          label: "值",
        },
        conditions: {
          value: [
            {
              column: "",
              condition: "",
              v1: "",
            },
          ],
          placeholder: "请输入查询条件",
          label: "查询条件",
        },
        limit: {
          value: 200,
          placeholder: "请输入查询条数",
          label: "limit",
        },
      },
    };
  },
  computed: {
    finalStr: function() {
      const res = [];
      res.push(this.formItems.modelName.value);
      res.push(this.formItems.delimiter.value);
      res.push(this.formItems.keys.value.join("|"));
      res.push(this.formItems.values.value.join("|"));
      const conditionsArr = [];
      const cons = this.formItems.conditions.value;
      for (const index in cons) {
        conditionsArr.push(
          cons[index].column +
            "|" +
            cons[index].condition +
            "|" +
            cons[index].v1
        );
      }
      res.push(conditionsArr.join("%"));
      res.push(this.formItems.limit.value);
      return res.join(",");
    },
  },
  methods: {
    removeKey() {
      this.formItems.keys.value.pop();
    },
    addKey() {
      this.formItems.keys.value.push("");
    },
    removeValue() {
      this.formItems.values.value.pop();
    },
    addValue() {
      this.formItems.values.value.push("");
    },
    removeCondition(item) {
      const index = this.formItems.conditions.value.indexOf(item);
      this.formItems.conditions.value.splice(index, 1);
    },
    addCondition(item) {
      const index = this.formItems.conditions.value.indexOf(item);
      this.formItems.conditions.value.splice(index + 1, 0, {
        column: "",
        condition: "",
        v1: "",
      });
    },
    handleOk() {
      this.setModal1Visible(false);
    },
    handleCancle() {
      this.setModal1Visible(false);
    },
    setModal1Visible(modal1Visible) {
      this.modal1Visible = modal1Visible;
    },
  },
};
</script>
<style scoped>
.dynamic-button {
  cursor: pointer;
  margin-left: 2px;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-button:hover {
  color: #777;
}
.dynamic-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
