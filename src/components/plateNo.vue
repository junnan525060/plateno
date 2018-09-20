<template>
  <div>
    <div class="div-plate-no" @click="showCarNum()">
      <input class="input-plate-no" id='plateNo' v-model="plateNo"
             readonly ref="plateNo" type="text">
    </div>

    <div ref="keyboard" class="keyboard" style="background: #eeeeee">
      <button class="btn-complete" @click="closeKeyboard()"><span>完成</span></button>
      <!--发证机关-->
      <div ref="carText" style="display: none">
        <div v-for="item in carTxt" class="keyboard-row">
          <button v-for="btn in item" class="keyboard-row-item" @click="btnWordClick($event)">{{btn}}</button>
        </div>
        <div class="keyboard-row">
          <button class="keyboard-row-item bottom" @click="btnWordClick($event)">新</button>
          <button class="keyboard-row-item bottom" @click="btnWordClick($event)">临</button>
          <button v-for="item in noneBottomtxt" class="none-botton">{{item}}</button>
          <div class="keyboard-row-item clear">
            <img src="../../static/img/car-no-delete.png" @click="deletePlateNo()">
          </div>
        </div>
      </div>

      <div ref="carNum" style="display: none">
        <div v-for="(item,index4) in carNum" class="keyboard-row">
          <button v-for="btn in item" v-if="index4 === 0" class="keyboard-row-item adis" @click="btnWordClick($event)">
            {{btn}}
          </button>
          <button v-for="btn in item" v-if="index4 !== 0" class="keyboard-row-item adisNum"
                  @click="btnWordClick($event)">{{btn}}
          </button>
        </div>
        <div class="keyboard-row">
          <button v-for="item in carNumBottom" class="keyboard-row-item bottom adisNum" @click="btnWordClick($event)">
            {{item}}
          </button>
          <button v-for="item in noneBottom" class="none-botton">{{item}}</button>
          <div class="keyboard-row-item clear">
            <img src="../../static/img/car-no-delete.png" @click="deletePlateNo()">
          </div>
        </div>
      </div>

      <div ref="carNumLast" style="display: none">
        <div v-for="(item,index7) in carNum" class="keyboard-row">
          <button v-for="btn in item" v-if="index7 === 0" class="keyboard-row-item" @click="btnWordClick($event)">
            {{btn}}
          </button>
          <button v-for="btn in item" v-if="index7 !== 0" class="keyboard-row-item adisNum"
                  @click="btnWordClick($event)">{{btn}}
          </button>
        </div>
        <div class="keyboard-row">
          <button v-for="item in carNumBottom2" class="keyboard-row-item bottom adisNum" @click="btnWordClick($event)">
            {{item}}
          </button>
          <button class="none-botton"></button>
          <div class="keyboard-row-item clear">
            <img src="../../static/img/car-no-delete.png" @click="deletePlateNo()">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable indent,semi */
  export default {
    name: 'plateno',
    data () {
      return {
        plateNo: '',
        carTxt: [
          ['京', '冀', '沪', '津', '鲁', '晋', '蒙', '辽', '吉', '黑'],
          ['苏', '浙', '皖', '闽', '赣', '粤', '豫', '鄂', '湘', '桂'],
          ['琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁']
        ],
        noneBottomtxt: ['', '', '', '', '', ''],
        carNum: [
          ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
          ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
          ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V']
        ],
        carNumBottom: ['W', 'X', 'Y', 'Z'],
        carNumBottom2: ['W', 'X', 'Y', 'Z', '港', '澳', '学'],
        noneBottom: ['', '', '', '']
      }
    },
    watch: {
      plateNo (newVal, oldVal) {
        // 1.判断车牌到第几位了
        const len = newVal.length;
        // 2.根据车牌位数选择显示那个桌面框
        this.changeShowPlateNoPanel(len, this.plateNo);
        // 3.传递参数到父页面
        this.$emit('getPlateNo', this.plateNo);
      }
    },
    methods: {
      showCarNum() {
        // 1.判断车牌到第几位了
        const len = this.plateNo.length;
        // 2.根据车牌位数选择显示那个桌面框
        this.changeShowPlateNoPanel(len, this.plateNo);
        this.$refs.keyboard.classList.remove('animationDown');
        this.$refs.keyboard.classList.add('animationUp');
      },
      btnWordClick($event) {
        const carText = $event.target.innerText;
        const plateNo = this.plateNo + carText;
        if (plateNo.length > 8) {
          return;
        }
        if (this.plateNo.indexOf('港') > -1 || this.plateNo.indexOf('澳') > -1 || this.plateNo.indexOf('学') > -1) {
          return;
        }
        this.plateNo = plateNo;
        // 1.如果包含那么隐藏掉键盘，2.不允许再添加元素
        if (carText === '港' || carText === '澳' || carText === '学') {
          this.closeKeyboard();
          return;
        }
        if (plateNo.length === 8) {
          this.closeKeyboard();
        }
      },
      deletePlateNo() {
        const len = this.plateNo.length;
        if (len > 0) {
          this.plateNo = this.plateNo.substr(0, len - 1);
        }
      },
      // 关闭键盘
      closeKeyboard () {
        this.$refs.keyboard.classList.remove('animationUp');
        this.$refs.keyboard.classList.add('animationDown');
      },
      // 根据车牌位数选择显示那个桌面框，同时屏蔽其他相关功能
      changeShowPlateNoPanel(len) {
        switch (len) {
          case 0:
            this.showPlateNoPanel('CARTEXT');
            break;
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            this.showPlateNoPanel('CARNUM');
            break;
          default:
            this.showPlateNoPanel('CARNUMLAST');
            break;
        }
        let adises = document.getElementsByClassName('adis');
        let adisNums = document.getElementsByClassName('adisNum');
        // 临时车，设置第一排可用，其他的不可用
        if (arguments[1].indexOf('临') > -1) {
          for (let i = 0; i < adises.length; i++) {
            adises[i].removeAttribute('disabled');
          }
          for (let i = 0; i < adisNums.length; i++) {
            adisNums[i].setAttribute('disabled', 'disabled');
          }
        } else {
          for (let i = 0; i < adisNums.length; i++) {
            if (adisNums[i].getAttribute('disabled')) {
              adisNums[i].removeAttribute('disabled');
            }
          }
          if (len === 1) {
            for (let i = 0; i < adises.length; i++) {
              adises[i].setAttribute('disabled', 'disabled');
            }
          } else {
            for (let i = 0; i < adises.length; i++) {
              adises[i].removeAttribute('disabled');
            }
          }
        }
      },
      // 显示车牌面板
      showPlateNoPanel(param) {
        const carText = this.$refs.carText;
        const carNum = this.$refs.carNum;
        const carNumLast = this.$refs.carNumLast;
        switch (param) {
          case 'CARTEXT':
            carText.style.display = 'block';
            carNum.style.display = 'none';
            carNumLast.style.display = 'none';
            break;
          case 'CARNUM':
            carText.style.display = 'none';
            carNum.style.display = 'block';
            carNumLast.style.display = 'none';
            break;
          case 'CARNUMLAST':
            carText.style.display = 'none';
            carNum.style.display = 'none';
            carNumLast.style.display = 'block';
            break;
          default:
            carText.style.display = 'none';
            carNum.style.display = 'none';
            carNumLast.style.display = 'none';
            break;
        }
      }
    }
  }
</script>

<style>

  .div-plate-no {
    width: 100%;
    height: 48px;
    line-height: 48px;
    border: #eeeeee solid 1px;
  }

  .input-plate-no {
    min-width: 1em;
    max-width: 8em;
    height: 100%;
    line-height: 100%;
    font-size: 1.8em;
    float: left;
    border: none;
  }

  button:disabled {
    background: #f4f4f4 !important;
    color: #8f8f8f !important;
  }

  .keyboard {
    width: 100%;
    height: 6.493333rem;
    position: fixed;
    bottom: -6.493333rem;
    z-index: 10;
    left: 0;
  }

  .keyboard .btn-complete {
    height: 0.96rem;
    text-align: right;
    color: #3b6cff;
    font-size: 0.4rem;
    width: 100%;
    background: #fff;
    border: none;
    border-top: 0.013333rem solid #eee;
  }

  .keyboard .btn-complete span {
    margin-right: 0.4rem;
  }

  .animationDown {
    animation: slide_dowms 0.3s ease-out;
    animation-fill-mode: forwards;
  }

  .animationUp {
    animation: slide_ups 0.3s ease-out;
    animation-fill-mode: forwards;
  }

  @keyframes slide_ups {
    from {
      bottom: -502px;
    }
    to {
      bottom: 0px;
    }
  }

  @keyframes slide_dowms {
    from {
      bottom: 0px;
    }
    to {
      bottom: -502px;
    }
  }

  .keyboard-row {
    margin-top: 0.266667rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.106667rem;
    color: #333;
  }

  .keyboard-row-item {
    width: 0.88rem;
    height: 1.066667rem;
    background: #fff;
    font-size: 0.453333rem;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 0.133333rem;
    color: #333;
  }

  .keyboard-row-item.bottom {
    height: 1.066667rem;
    width: 0.88rem;
    line-height: 1.066667rem;
    background: #fff;
    color: #333;
  }

  .none-botton {
    border: none;
    height: 1.066667rem;
    width: 0.88rem;
    visibility: hidden;
  }

  .keyboard-row-item.clear {
    width: 1.866667rem;
    height: 1.066667rem;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .keyboard-row-item.clear img {
    width: 0.826667rem;;
  }
</style>
