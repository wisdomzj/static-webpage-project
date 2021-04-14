/**
 * 校验策略
 * @author	zhangjun
 * @since	2021-4-05
 */
var strategies = {
    isNoEmpty(value, errorMsg) {
        if (!value) return errorMsg;
    },
    minLength(value, length, errorMsg) {
        if (value.length < length) return errorMsg;
    },
    maxLength(value, length, errorMsg) {
        if (value.length > length) return errorMsg;
    },
    // 中文校验
    isChinese(value, errorMsg) {
        if(!/^[\u4E00-\u9FA5]+$/.test(value)) return errorMsg;
    },
    // 手机号码校验
    isMoblie(value, errorMsg) {
        if(!/(^1[3456789]\d{9}$)|^$/.test(value)) return errorMsg;
    },
    // 邮箱校验
    isEmail(value, errorMsg) {
        if(!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value)) return errorMsg;
    },
    // qq校验
    isQqNumber(value, errorMsg) {
        if(!/(^[0-9]{5,15}$)|^$/.test(value)) return errorMsg;
    },
    // 身份证校验
    isQqNumber(value, errorMsg) {
        if(!/^[1-9]\d{5}[1-9]\d{3}(((0[13578]|1[02])(0[1-9]|[12]\d|3[0-1]))|((0[469]|11)(0[1-9]|[12]\d|30))|(02(0[1-9]|[12]\d)))(\d{4}|\d{3}[xX])$/.test(value)) return errorMsg;
    }
}

/**
 * 校验器 
 * @author	zhangjun
 * @since	2021-4-05
 * @param {*} verifMap 校验属性配置map
 */
function Validator(verifMap) {
    
    // 缓存验证属性所有策略集合
    this.cache = [];
    
    // 添加校验策略
    this.add = function (val, rules) {
        for (let rule of rules) {
            let strategyAry = rule.strategy.split(':') 
            let errorMsg = rule.errorMsg
            let strategy = strategyAry.shift()
            strategyAry.unshift(val)
            strategyAry.push(errorMsg)
            this.cache.push({
                strategy,
                params: strategyAry
            })
        }
    }   

    // 启动所有校验
    this.start = function () {
        for(let i=0; i<this.cache.length; i++){
            var strategy = this.cache[i].strategy;
            var params = this.cache[i].params;

            let errorMsg = strategies[strategy](params[0], params[1])
            if(errorMsg) return errorMsg
        }
    }

    // 条件不满足，输出当前错误信息
    this.show = function (verifData) {
        for(let i=0; i<verifMap.length; i++){ 
            let v = verifData[verifMap[i].attr];
            let r = verifMap[i].rules
            // 必填验证
            if(verifMap[i].isReq) {
                this.add(v, r)
            } 

            // 非必填验证, 有值才进行添加缓存策略集合
            if(!verifMap[i].isReq && v) {
                this.add(v, r)
            }
        }

        let errorMsg = this.start();
        
        return errorMsg;
    }
}







