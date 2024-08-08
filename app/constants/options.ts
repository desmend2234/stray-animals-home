type AnimalKind = '狗' | '貓' | '其他' | 'All';

// 定義混種動物的類型
interface MixedBreed {
  kind: AnimalKind;
  breed: string | string[];
  sex: ['M' | 'F'] | ['M' | 'F', 'M' | 'F'];
}

// 定義一個包含混種犬或混種貓的陣列
export const variety: MixedBreed[] = [
  { kind: 'All', breed: 'All', sex: ['F', 'M'] },
  { kind: '狗', breed: '邊境牧羊犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '大白熊', sex: ['F', 'M'] },
  { kind: '狗', breed: '大型雪納瑞', sex: ['F', 'M'] },
  { kind: '狗', breed: '小型狐狸犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '巴哥犬', sex: ['F', 'M'] },
  {
    kind: '狗',
    breed: '比利時牧羊犬(格羅安達 / 馬利諾 / 坦比連)',
    sex: ['F', 'M'],
  },
  { kind: '狗', breed: '比利時狼犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '比特', sex: ['F', 'M'] },
  { kind: '狗', breed: '比特犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '比特犬之混種犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '比熊犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '牛頭梗', sex: ['F', 'M'] },
  { kind: '狗', breed: '台灣犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '吉娃娃', sex: ['F', 'M'] },
  { kind: '狗', breed: '吉娃娃犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '米格魯犬', sex: ['F', 'M'] },
  { kind: '其他', breed: '其他', sex: ['F', 'M'] },
  { kind: '狗', breed: '法國鬥牛犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '長毛臘腸', sex: ['F', 'M'] },
  { kind: '狗', breed: '哈士奇(西伯利亞雪橇犬)', sex: ['F', 'M'] },
  { kind: '狗', breed: '威爾斯柯基犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '威瑪獵犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '洛威納犬(羅威那犬)', sex: ['F', 'M'] },
  { kind: '狗', breed: '約克夏', sex: ['F', 'M'] },
  { kind: '狗', breed: '美國惡霸犬', sex: ['F', 'M'] },
  { kind: '貓', breed: '美國短毛貓', sex: ['F', 'M'] },
  { kind: '貓', breed: '英國長毛貓', sex: ['F', 'M'] },
  { kind: '貓', breed: '英國短毛貓', sex: ['F', 'M'] },
  { kind: '狗', breed: '柴犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '泰國脊背犬(泰皇犬)', sex: ['F', 'M'] },
  { kind: '狗', breed: '狼犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '迷你雪納瑞', sex: ['F', 'M'] },
  { kind: '狗', breed: '馬爾濟斯', sex: ['F', 'M'] },
  { kind: '狗', breed: '高山犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '高加索犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '敖犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '混種犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '混種狗', sex: ['F', 'M'] },
  { kind: '其他', breed: '混種家兔', sex: ['F', 'M'] },
  { kind: '貓', breed: '混種貓', sex: ['F', 'M'] },
  { kind: '狗', breed: '雪納瑞', sex: ['F', 'M'] },
  { kind: '狗', breed: '傑克羅素梗', sex: ['F', 'M'] },
  { kind: '狗', breed: '博美犬', sex: ['F', 'M'] },
  { kind: '貓', breed: '喜馬拉雅貓(短毛)', sex: ['F', 'M'] },
  { kind: '其他', breed: '貂', sex: ['F', 'M'] },
  { kind: '狗', breed: '貴賓', sex: ['F', 'M'] },
  { kind: '狗', breed: '貴賓犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '黃金獵犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '瑪爾貴賓混種犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '瑪爾濟斯犬', sex: ['F', 'M'] },
  { kind: '狗', breed: '德國狼犬(德國牧羊犬)', sex: ['F', 'M'] },
  { kind: '狗', breed: '臘腸犬', sex: ['F', 'M'] },
];
