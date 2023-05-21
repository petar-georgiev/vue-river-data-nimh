<template>
  <div class="container">
    <h2 class="text-center">{{ titleRiver }}</h2>
    <button @click="exportCSV">Export to CSV</button>
    <br><br>
    <div class="d-flex justify-content-end">
      <input type='text' class="form-control" v-model='startDate' placeholder='Select Start Date' style='width: 300px;' @input="validateInput">
      <input type='text' class="form-control" v-model='endDate' placeholder='Select End Date' style='width: 300px;' @input="validateInput">
      <button @click="fetchRiversByDates" :disabled="!isFetchDataEnabled">Fetch Data</button>
    </div>
    <table class="table table-striped">
      <thead class="thead-dark">
        <th>Id</th>
        <th>№ ХМС</th>
        <th>Река</th>
        <th>Хидрометрична станция (ХМС)</th>
        <th>Qmin [m3/s]</th>
        <th>Qср. [m3/s]</th>
        <th>Qmax [m3/s]</th>
        <th>H [cm]</th>
        <th>Q [m3/s]</th>
        <th>ΔH [cm]</th>
        <th>Дата</th>
      </thead>
      <tbody>
        <tr class="thead-dark">
          <td></td>
          <td></td>
          <td><input type="text" v-model="riverField" /></td>
          <td><input type="text" v-model="stationField" /></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><input type="text" v-model="ldField" /></td>
        </tr>
        <tr v-for="river in paginatedItems" v-bind:key="river.id">
          <td> {{ river.id }}</td>
          <td> {{ river.numSt }}</td>
          <td> {{ river.name }}</td>
          <td> {{ river.station }}</td>
          <td> {{ river.minQ }}</td>
          <td> {{ river.avrQ }}</td>
          <td> {{ river.maxQ }}</td>
          <td> {{ river.h }}</td>
          <td> {{ river.q }}</td>
          <td> {{ river.dh }}</td>
          <td> {{ river.ld }}</td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="text-center d-flex justify-content-center">
        <button v-if="this.currentPage > 1" @click="this.currentPage--">Previous </button>
        <span>&nbsp;</span>
        <div class="pagination border border-dark"><span>&nbsp;</span>Page: {{ currentPage }} / {{ this.pagesCount
        }}<span>&nbsp;</span> </div>
        <span>&nbsp;</span>
        <button v-if="this.currentPage < this.pagesCount" @click="this.currentPage++"> Next >></button>
      </ul>
    </nav>
  </div>
</template>

<script>
// import { tSExpressionWithTypeArguments } from '@babel/types';
import RiverFetcherService from '../services/RiverFetcherService';
import { Parser } from '@json2csv/plainjs';

function downloadBlob(content, filename, contentType) {
  // Create a blob
  var blob = new Blob([content], { type: contentType });
  var url = URL.createObjectURL(blob);

  // Create a link to download it
  var pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', filename);
  pom.click();
}

export default {
  name: 'DunabeBasin',
  props: {
    basein: {
      type: [String],
      default: 'dunabeBasin'
    }
  },
  watch: {
    basein: {
      immediate: true,
      handler() {
        this.currentPage = 1;
        this.getRivers(this.basein);
      },
    },
    startDate() {
      this.validateInput();
    },
    endDate() {
      this.validateInput();
    },
  },
  data() {
    return {
      rivers: [],
      displayedRivers: [],
      currentPage: 1,
      rowsPerPage: 100, // Number of rows per page
      riverField: '',
      stationField: '',
      ldField: '',
      startDate: '',
      endDate: '',
      isFetchDataEnabled: false,
    };
  },
  computed: {
    showLoadMoreButton() {
      return this.currentPage * this.rowsPerPage < this.rivers.length;
    },
    pagesCount() {
      const filteredItems = this.rivers.filter(item =>
        (item.name.toLowerCase().includes(this.riverField.toLowerCase()) || !this.riverField) &&
        (item.station.toLowerCase().includes(this.stationField.toLowerCase()) || !this.stationField) &&
        (item.ld.toLowerCase().includes(this.ldField.toLowerCase()) || !this.ldField)
      );
      return Math.ceil(filteredItems.length / this.rowsPerPage);
    },
    filterdItems() {
      return this.rivers.filter(item =>
        (item.name.toLowerCase().includes(this.riverField.toLowerCase()) || !this.riverField) &&
        (item.station.toLowerCase().includes(this.stationField.toLowerCase()) || !this.stationField) &&
        (item.ld.toLowerCase().includes(this.ldField.toLowerCase()) || !this.ldField));

    },
    paginatedItems() {
      return this.filterdItems.slice((this.currentPage - 1) * this.rowsPerPage, ((this.currentPage - 1) * this.rowsPerPage) + this.rowsPerPage)
    },
    titleRiver() {
      if (this.basein === 'blackSeaBasin') {
        return 'Черноморски басейн';
      } else if (this.basein === 'dunabeBasin') {
        return 'Дунавски басейн';
      } else if (this.basein === 'easternWhiteSeaBasin') {
        return 'Източнобеломорски басейн';
      } else if (this.basein === 'westernWhiteSeaBasin') {
        return 'Западнобеломорски басейн';
      }
      return 'Дунавски басейн';
    }
  },
  methods: {
    getRivers(basein) {
      RiverFetcherService.getRivers(basein).then((response) => {
        this.rivers = response.data;
        this.loadNextPage();
      });
    },
    fetchRiversByDates() {
      RiverFetcherService.getRiversByStartEndDate(this.basein, this.startDate, this.endDate)
        .then((response) => {
          this.rivers = response.data;
          this.loadNextPage();
        });
    },
    validateInput() {
      this.isFetchDataEnabled = Boolean(this.startDate) && Boolean(this.endDate);
    },
    loadNextPage() {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      this.displayedRivers = this.rivers.slice(startIndex, endIndex);
    },
    loadMoreRows() {
      this.currentPage++;
      this.loadNextPage();
    },
    exportCSV() {
      const parser = new Parser();

      // Define the desired column order
      const desiredColumns = ['id', 'numSt', 'name', 'station', 'minQ', 'avrQ', 'maxQ', 'h', 'q', 'dh', 'ld'];

      // Rearrange the column order
      const rearrangedItems = this.filterdItems.map(item => {
        const rearrangedItem = {};
        desiredColumns.forEach(column => {
          rearrangedItem[column] = item[column];
        });
        return rearrangedItem;
      });

      const csv = parser.parse(rearrangedItems);
      console.log(csv);
      downloadBlob(csv, `${this.titleRiver} - ${new Date()}.csv`, 'text/csv;encoding:utf-8');
    }
  },
};
</script>

<style>
.pagination-info {
  margin-bottom: 10px;
}
</style>