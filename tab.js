//即時関数
(()=> {
  
  const $doc = document;
  const $tab = $doc.getElementById("js-tab");
  //querySelectorAll("idやクラス、[属性]")で、DOMの中でその属性を持つDOM要素だけ抜き出せる
  const $nav = $tab.querySelectorAll("[data-nav]");
  const $content = $tab.querySelectorAll("[data-content]");

  //初期化
  const init = () => {
    //contentの1個目だけ、style(CSSの.tab-contents-itemの所の)displayの設定をブロックする
    $content[0].style.display = "block";
  };
  init();

  //クリック起こるイベント
  const handleClick = (e) => {
    //クリックされたことを一回なかったことにする（タブをクリックすると、HTMLでは<a hrefとなってるから、このリンク先に遷移するというイベントが発生してしまう）
    //ここで使用するeは、リンク先に遷移するということではなく、クリックされたものは何ですかという情報を得るために使用するから
    e.preventDefault();

    //クリックしたところのDOM要素をピンポイントで取得
    const $this = e.target;
    
    //navにしているデータ属性を取得
    const targetVal = $this.dataset.nav;

    //すでに表示されているコンテンツを全てクリアする
    //そしてすでにis-active(黒)になっているnavigation(タブ)のclass属性のis-activeをはずす
    let index = 0;
    while(index < $nav.length){
      $content[index].style.display = "none"
      $nav[index].classList.remove("is-active")
      index++;
    }

    //data-contentのうち、クリックして取得したデータ属性(targetVal)のDOMを取得して（1個しかないけど[0]と書く）
    $tab.querySelectorAll('[data-content="' + targetVal + '"]')[0].style.display = "block";
    
    //クリックしたnavigation(タブのところ)に含まれているclass属性を全て取得してclassListへ追加する
    //is-active(クリックしたタブが黒くなる)というclassが、クリックした所に追加される（クリックしたらis-activeになる、黒くなる）
    $nav[targetVal].classList.add("is-active");
    };

  //全nav要素に対して関数を適用
  let index = 0;
  while(index < $nav.length){
    $nav[index].addEventListener("click", (e) => handleClick(e));
    index++;
  }

})();