import { PageHeader } from "@/components/page-header"

const faqs = [
  ["このサイトの地図は何を表示していますか？", "国土地理院の地理院タイルを利用し、避難所の位置と各種ハザード情報を重ねて表示しています。"],
  ["現在地が取得できません", "ブラウザの位置情報利用を許可し、HTTPS接続またはlocalhostでお試しください。"],
  ["避難所はいつ開設されますか？", "災害の種類や規模によって異なります。最新の開設情報は宮崎市からの発表をご確認ください。"],
  ["ペットを連れて避難できますか？", "避難所ごとに対応が異なります。避難所一覧のペット対応表示と詳細情報をご確認ください。"],
]

export default function FaqPage() {
  return <><PageHeader eyebrow="FAQ" title="よくある質問" description="宮東地区 防災マップの使い方や、避難に関するよくある質問をまとめています。" /><section className="mx-auto max-w-3xl space-y-3 px-4 pb-12">{faqs.map(([question, answer]) => <details key={question} className="rounded-lg border border-border bg-card p-5"><summary className="cursor-pointer font-bold">{question}</summary><p className="mt-3 leading-7 text-muted-foreground">{answer}</p></details>)}</section></>
}
