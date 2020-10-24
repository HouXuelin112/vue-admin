<template>
  <div>
    <DxDataGrid
      :data-source="employees"
      :selection="{ mode: 'multiple' }"
      :show-borders="true"
      :hover-state-enabled="true"
      key-expr="ID"
      @selection-changed="onSelectionChanged"
      @cell-click="onCellClick"
      @cell-hover-changed="onCellHoverChanged"
    >
      <DxEditing :allow-updating="allowUpdating" mode="cell"></DxEditing>
      <DxColumn :width="70" data-field="Prefix" caption="Title" />
      <DxColumn data-field="FirstName" />
      <DxColumn data-field="LastName" />
      <DxColumn :width="180" data-field="Position" />
      <DxColumn data-field="BirthDate" data-type="date" />
      <DxColumn data-field="HireDate" data-type="date" />
    </DxDataGrid>
    <div v-if="showEmployeeInfo" id="employee-info">
      <p class="employee-notes">{{ selectedRowNotes }}</p>
    </div>
  </div>
</template>
<script>
import { DxDataGrid, DxColumn, DxEditing } from "devextreme-vue/data-grid";
import { employees } from "./data1.js";

export default {
  name: "DevExtreme",
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
  },
  data() {
    return {
      showEmployeeInfo: false,
      selectedRowNotes: "",
      selectedRowPicture: "",
      employees,
      allowUpdating: false,
    };
  },
  methods: {
    handleChange(event, key){
      console.log(event, key)
    },
    onCellHoverChanged({columnIndex}){
      if(columnIndex === 2){
        this.allowUpdating = true
      }else{
        this.allowUpdating = false
      }
    },
    onCellClick(e) {
      console.log(e)
    },
    onSelectionChanged(e) {
      const data = e.selectedRowsData[0];

      this.showEmployeeInfo = !!data;
      this.selectedRowNotes = data && data.Notes;
      this.selectedRowPicture = data && data.Picture;
    },
  },
};
</script>
<style scoped>
#employee-info .employee-photo {
  height: 100px;
  float: left;
  padding: 20px;
}
#employee-info .employee-notes {
  padding-top: 20px;
  text-align: justify;
}
.dark #employee-info .employee-notes {
  color: rgb(181, 181, 181);
}
</style>
