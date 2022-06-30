class GwnuURL {
  constructor() {
    this.humanitiesURLs = {
      gukmun: "https://gukmun.gwnu.ac.kr/gukmun/27599/subview.do",
      english: "https://english.gwnu.ac.kr/english/29693/subview.do",
      german: "https://german.gwnu.ac.kr/german/27952/subview.do",
      zhongwen: "https://zhongwen.gwnu.ac.kr/zhongwen/25392/subview.do",
      phil: "https://phil.gwnu.ac.kr/phil/27789/subview.do",
      history: "https://history.gwnu.ac.kr/history/27997/subview.do",
      japan: "https://japan.gwnu.ac.kr/japan/27736/subview.do",
    };

    this.societyURLs = {
      eco: "https://eco.gwnu.ac.kr/eco/28230/subview.do",
      biz: "https://biz.gwnu.ac.kr/biz/28675/subview.do",
      acc: "https://acc.gwnu.ac.kr/acc/25524/subview.do",
      trade: "https://trade.gwnu.ac.kr/trade/27540/subview.do",
      upre: "https://upre.gwnu.ac.kr/upre/25460/subview.do",
      law: "https://law.gwnu.ac.kr/law/29015/subview.do",
      tourism: "https://tourism.gwnu.ac.kr/tourism/25597/subview.do",
      knlga: "https://knlga.gwnu.ac.kr/knlga/31191/subview.do",
      icas: "https://icas.gwnu.ac.kr/icas/29429/subview.do",
    };

    this.engineeringURLs = {
      civil: "https://civil.gwnu.ac.kr/civil/27353/subview.do",
      mme: "https://mme.gwnu.ac.kr/mme/29179/subview.do",
      ee: "https://ee.gwnu.ac.kr/ee2/31950/subview.do",
    };
  }

  getURLs () {
    const URLs = [this.humanitiesURLs, this.societyURLs, this.engineeringURLs];
    return URLs;
  }
}

module.exports = GwnuURL;