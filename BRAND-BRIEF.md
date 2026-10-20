# BRAND-BRIEF.md - dr.GUT Fibras

Montado no Passo 2 do CONSULTING_LP_PLAYBOOK-v2.md em 2026-10-20.
Fontes: client-assets/theme-tokens.css (CSS ao vivo), client-assets/pdp.md,
client-assets/education.md, client-assets/ads/, e pesquisa externa (seção 7).

Regra que vale para a página inteira: nada aqui pode ser ampliado. Se um número
não está neste arquivo com fonte, ele não entra na LP.

---

## 1. Tokens de design (do CSS ao vivo de drgut.com.br)

Arquivo completo em `client-assets/theme-tokens.css`. O que a LP precisa:

| Token | Valor |
|---|---|
| Fonte de corpo | Poppins, sans-serif, 400, 15px, line-height 1.714 |
| Fonte de título | Sora, sans-serif, 600, letter-spacing -0.034em |
| Fonte de botão | Sora, sans-serif, 15px, text-transform unset |
| Vermelho da marca | `#e82d3a` (primária, CTA, links em hover) |
| Vermelho do header/selo | `#e72e3a` (uma variação de 1 dígito, ver nota) |
| Hover do botão primário | `#fe7900` (laranja) |
| Texto | `#444444` |
| Título | `#111111` |
| Borda | `#ebebeb`, cinza claro `#f5f5f5` |
| Verde do Pix | `#12b39a` |
| Amarelo do badge | `#f6c445` sobre `#1a1a1a` |
| Raio de botão | `30px` (pílula) |
| Raio de card de produto | `20px`, borda `#e6e4e3` |
| Raio geral | `10px` |
| Sombra | `5px 0px 30px 0px rgba(0,0,0,0.08)` |
| Largura da página | `1200px` (fluido 1410px) |
| Espaço entre seções | 50px mobile, 90px em >=768px |
| Altura do header | 74px, barra promo 48px |
| Transição | `0.2s cubic-bezier(0.4, 0, 0.2, 1)` |
| Base rem | `html { font-size: 62.5% }`, ou seja 1rem = 10px |

Nota: o tema usa `#e82d3a` nos tokens globais e `#e72e3a` nas configurações de
header e de badge de promoção. Diferença visualmente imperceptível, mas vou
padronizar a LP em `#e82d3a` (o token global) e usar `#e72e3a` apenas se
replicar o header exato. Judge.me usa `#e82d3a` nas estrelas.

Tipografia de títulos (escala do tema, 1rem = 10px):
h1 4rem, h2 3.6rem, h3 3rem, h4 2.4rem, h5 1.8rem, h6 1.6rem.

---

## 2. Constantes de confiança (verbatim, usar sempre assim)

**Garantia:**
"30 Dias de garantia incondicional. Se você não sentiu diferença no seu trânsito
intestinal em 30 dias de uso contínuo, devolvemos 100% do seu dinheiro. Sem
burocracia, sem questionamento."

Versão curta usada no site: "Garantia 30 dias". Na homepage: "Experimente por
30 dias. Não sentiu diferença? A gente devolve seu dinheiro. Sem burocracia. O
GUT garante."

**Frete:** "Frete grátis acima de R$ 247"

**Parcelamento:** "Parcele até 3x sem juros"

**Pix:** 5% de desconto (o carrinho mostra R$ 320,15 sobre R$ 337,00, que bate)

**Avaliação:** 5.0 com **1 avaliação**. Esse é o número real. Qualquer estrela na
LP tem que vir rotulada como "1 avaliação", nunca como prova social de volume.

**Empresa:** GLUB NUTRITION LTDA, CNPJ 67.582.951/0001-97

**Selos declarados:** Sem glúten, sem cafeína, adoçado com estévia, formulado
por doutores.

---

## 3. Fatos do produto (tabela nutricional manda)

Dose: 8 g (1½ scoop) em 200 ml de água gelada. Dissolve em 30 segundos.
Pote: 30 doses.

| Nutriente | Por dose (8 g) | % VD |
|---|---|---|
| Valor energético | 14 kcal | 1% |
| Carboidratos | 1,8 g | 1% |
| Açúcares totais | 0,4 g | n/a |
| Açúcares adicionados | 0 g | 0% |
| **Fibras alimentares** | **5,8 g** | **23%** |
| Vitamina C | 50 mg | 100% |
| Biotina (B7) | 30 μg | 100% |
| Zinco | 11 mg | 100% |
| Selênio | 30 μg | 50% |

**As 3 fibras:**
- **Polidextrose:** dá volume e maciez ao trânsito intestinal
- **Inulina de chicória:** a prebiótica clássica, alimento preferido das bactérias boas
- **Goma guar parcialmente hidrolisada (PHGG):** suave, dissolve sem virar gel, é a razão de dar pra tomar todo dia

As três são solúveis. "Por isso o copo fica leve e não empelota."

**Atenção:** a marca não publica a quebra em gramas de cada fibra, só o total de
5,8 g. Isso importa para a seção 7 (evidência). A LP não pode citar dose de
estudo de uma fibra isolada sem saber quanto dela tem no produto.

**Número corrigido:** o subtítulo da PDP e um post do blog dizem "5,7g". A tabela
nutricional, a fórmula, o FAQ e a tabela comparativa dizem 5,8 g. **Usar 5,8 g.**

---

## 4. Oferta e preços exatos

| Kit | Preço unitário | Total | Compare at (R$160/un) |
|---|---|---|---|
| 1 lata | R$ 147,00 | R$ 147,00 | R$ 160,00 |
| 2 latas | R$ 123,50 | R$ 247,00 | R$ 320,00 |
| 3 latas | R$ 112,33 | R$ 336,99 | R$ 480,00 |

Rótulos do site: 2 latas = "Mais vendido", 3 latas = "Maior Economia".

**Unidade:** de R$ 160,00 por R$ 147,00, "-8% OFF", "Economize R$ 13,00",
"30 dias de uso", "até 3× de R$ 49,00 s/ juros". Confere: 160-147 = 13, e
3 × 49 = 147.

**Custo por dose:** R$ 147 / 30 = **R$ 4,90** (bate com a tabela comparativa do
site). No kit de 3: R$ 112,33 / 30 = R$ 3,74 por dose.

**Descoberta útil para o buy block:** o kit de 2 fecha em exatamente R$ 247,00,
que é o limite do frete grátis. O kit de 2 é o primeiro degrau que zera o frete.
Pendência: o site diz "acima de R$ 247" e o kit de 2 dá R$ 247,00 exatos.
Confirmar se o igual conta, senão a promessa quebra justamente no kit "mais
vendido".

**Variant ID visto no carrinho:** 48293682151642 (serve de referência, mas os IDs
reais entram no Passo 5 conforme o playbook).

### Inconsistência de matemática no carrinho (P0 para a LP não herdar)

O carrinho com 3 unidades mostra: R$ 480,00 riscado, "Descontos: −R$ 104,00",
subtotal R$ 337,00.

Esses três números não fecham entre si:
- 480 − 104 = 376, e não 337
- O desconto de 104 é calculado sobre 3 × 147 = 441 (441 − 337 = 104)
- O risco de 480 é calculado sobre 3 × 160 = 480

Ou seja, o site mistura duas bases: risca pelo "compare at" de R$160 e calcula o
desconto pelo preço cheio de R$147. **Na LP eu escolho uma base só e faço a conta
fechar na tela**, como manda a regra 2 do contrato. Recomendo ancorar em R$160
(compare at) e mostrar a economia real de R$ 143,01 no kit de 3.

**Pendência:** R$ 112,33 (seletor) vs R$ 112,34 (carrinho). Preciso do valor
oficial antes de publicar a conta do kit.

---

## 5. Como a marca explica o produto (a voz)

**A tese central, que é o frame da LP inteira:**
"A gente alimenta. Não empurra." Laxante força e o problema volta. A dr.GUT dá
comida pras bactérias boas, e elas fazem o intestino funcionar sozinho.
"Fibra que alimenta, não que empurra."

Esse é o ângulo mais forte do material e é o que separa a marca de laxante, de
chá e de "pó da farmácia". Ele também é seguro em compliance, porque descreve
mecanismo e não cura.

**O mecanismo em 3 passos (homepage):**
1. Você toma, um copo por dia, sabor laranja
2. As bactérias comem, a fibra é a comida delas
3. O intestino funciona, sozinho, sem forçar

**Prebiótico x probiótico, do jeito da marca:**
"Probiótico é a bactéria boa; prebiótico é a comida dessa bactéria."

**O ciclo que o cliente reconhece (linguagem real, da própria PDP):**
"Acorda com a barriga normal. Ao longo do dia, ela vai estufando. À noite, a
roupa aperta e você se sente pesada. No banheiro, só funciona se forçar, ou com
laxante. E no dia seguinte, tudo de novo."
"Você já tentou de tudo: mais água, mais salada, chá, aquele pó da farmácia.
Melhora um dia. Depois volta. E você começa a achar que 'é assim mesmo'."
"Não é assim mesmo. Você só está tratando o sintoma."

Isso é ouro de copy e já é da marca. A LP deve usar quase verbatim.

**Honestidade como posicionamento (a marca faz isso melhor que a categoria):**
- "não prometemos prazo, porque corpo não é planilha"
- "Comida vem primeiro, sempre."
- "nenhum alimento ou suplemento é um escudo mágico contra doenças"
- "Nos primeiros dias, algumas pessoas sentem um pouco mais de gases. É a fibra
  começando a agir. Comece com meia dose e aumente aos poucos."

Esse último é raro e muito forte: a marca avisa do efeito colateral antes de
você sentir. Isso compra confiança e reduz devolução. **Deve estar na LP.**

**O GUT (mascote):** nasceu do logo, tem voz e opinião, traduz ciência difícil em
papo simples. "Toda marca tem um logo. Eu sou diferente: tenho voz, opinião e uma
missão." Serve para a faixa de marca escura perto do fim da página.

**Tom:** segunda pessoa, frases curtas, sem rigidez clínica, com humor seco.
Português do Brasil, informal mas não infantil.

---

## 6. O anúncio vencedor: BLOQUEADO

O playbook manda extrair daqui o ângulo, a promessa exata, a emoção e a oferta,
e isso vira o hero. **Não dá para cumprir com o material atual.**

Os 6 arquivos em `client-assets/ads/` são anúncios da **Seed (DS-01 Daily
Synbiotic)**, marca americana concorrente, não da dr.GUT. Detalhe em
`client-assets/ads/README.md`.

O que eles ensinam, como referência de ângulo:
- Linguagem direta sobre evacuação: "Pooping every day just got easier",
  "Poop Every Day", "25% Off Poop More + Bloat Less"
- Regularidade diária como promessa principal, inchaço em segundo lugar
- Oferta ancorada em preço riscado grande ($50 riscado para $38) ou percentual
  com brinde
- Uma peça usa depoimento nomeado como headline inteira ("Jen M.")
- Outra usa claim de liderança com **fonte impressa no próprio criativo**
  (SPINS, Amazon + Target, 52 semanas até junho de 2026)
- Todas carregam o disclaimer da FDA em letra miúda

O que isso vale para nós: confirma que o ângulo "regularidade dita sem eufemismo"
converte na categoria, e a dr.GUT já tem o equivalente em português pronto e mais
forte ("Barriga leve e Nº 2 em dia"). Mas a regra 5 do contrato exige a promessa
do anúncio vencedor **verbatim** no hero, e message match é o item de maior peso
no QC (Parte D). Sem o criativo real da dr.GUT, qualquer hero que eu escrever é
palpite.

**Preciso do cliente:** os 2 ou 3 criativos da dr.GUT que estão convertendo, com
a métrica que os elegeu. Enquanto não chegam, vou propor heros a partir da
promessa que a própria PDP já usa, e marcar como não verificado.

---

## 7. Pesquisa (com fontes)

### 7.1 O que a evidência realmente sustenta

Esta seção existe para a LP não ultrapassar a substanciação. Resumo: as 3 fibras
do dr.GUT têm respaldo real, mas **os estudos usam doses por fibra maiores do que
uma dose do produto provavelmente entrega**, já que a marca não publica a quebra
em gramas.

**Inulina de chicória.** Metanálise de 14 ECRs identificou aumento de frequência
evacuatória como efeito significativo. O efeito bifidogênico (aumento de
Bifidobacterium) aparece em doses de **3 a 20 g/dia**. O ensaio que melhorou
frequência, sintomas abdominais e qualidade de vida em adultos com constipação
funcional usou **12 g/dia**.
Fontes: metanálise de frutanos tipo inulina de chicória (2022); ECR de inulina de
chicória em constipação funcional, Journal of Food Sciences and Nutrition (2016).

**Goma guar parcialmente hidrolisada (PHGG).** A evidência é **mais consistente
para forma e maciez das fezes do que para frequência**. Em SII com constipação,
o braço ativo teve aumento médio de 1,57 evacuações espontâneas por semana contra
1,14 no placebo em 6 semanas (p=0,034). Em idosos institucionalizados, um ECR não
achou diferença significativa de frequência. Em pessoas saudáveis, 3 meses de
PHGG melhoraram a forma das fezes (escala de Bristol) sem efeito na frequência.
Fontes: ECR de PHGG em SII, Nutrition & Metabolism (2016); ECR em residentes de
longa permanência, J Nutr Health Aging (2022); ECR de consumo repetido de PHGG,
Nutrients (2019).

**Polidextrose.** Atua por volume e maciez, coerente com a descrição da marca.

**Como isso trava a copy:**
1. **Não citar números de ensaio clínico na LP.** O produto tem 5,8 g de fibra
   **somados em 3 tipos**, então nenhuma fibra isolada chega perto dos 12 g do
   estudo de inulina. Citar "aumenta a frequência em X" seria ultrapassar.
2. **O efeito bifidogênico é o terreno mais seguro**, porque aparece a partir de
   3 g/dia e é exatamente o mecanismo que a marca já comunica ("alimenta as
   bactérias boas"). A tese "a gente alimenta, não empurra" está bem amparada.
3. **Prometer maciez e menos esforço é mais defensável do que prometer
   frequência.** A evidência de PHGG aponta para forma de fezes. E a própria
   PDP já diz "Semana 1: O intestino cria ritmo. Menos esforço." Isso está certo.
4. A LP deve manter a recusa da marca a prometer prazo. É honesto e é blindagem.

### 7.2 Compliance ANVISA

A alegação **"As fibras alimentares auxiliam no funcionamento do intestino"** é
permitida pela IN 28/2018 da ANVISA para suplementos que atinjam o mínimo de
fibras da porção. O piso geral é de **2,5 g de fibra por porção**; o dr.GUT
entrega 5,8 g, com folga. **Essa é a frase segura para a claim principal**, e a
marca já a usa no FAQ.
Fonte: ANVISA, Instrução Normativa nº 28, de 26/07/2018, Anexo III.

Regras que valem na página (Parte E do playbook):
- Estrutura e função, nunca doença. "Auxilia no funcionamento do intestino", não
  "cura constipação". As palavras tratar, curar, prevenir e diagnosticar só podem
  aparecer dentro do disclaimer.
- Claims de micronutriente são por nutriente, e a marca já tem o fraseado certo:
  Vitamina C "auxilia no funcionamento do sistema imune"; Zinco "participa da
  divisão celular e da resposta imune"; Selênio "auxilia na proteção das células
  contra danos"; Zinco e Biotina "contribuem para a manutenção da pele e do
  cabelo".
- Disclaimer no rodapé, verbatim (texto completo em education.md seção 5).
- "Suplemento alimentar não substitui alimentação equilibrada."

### 7.3 Concorrência e a lacuna

Preços de referência no varejo brasileiro de suplemento de fibra em pó:

| Produto | Preço | Nota |
|---|---|---|
| Nutrify Prebiotic Fibers 210g | R$ 55,99 | entrada |
| Bio Fiber | R$ 59,97 | entrada |
| Puravida Pura Fiber 250g | R$ 73,90 | 6,8 g de fibra por dose, de acácia |
| Fiber Mais 260g | R$ 105,46 | líder de vendas na Amazon BR |
| Essential Nutrition Fiber Biome | R$ 178,20 | premium |
| **dr.GUT Fibras** | **R$ 147,00** | 5,8 g por dose + 4 micronutrientes |
Fonte: levantamento em Amazon.com.br, Drogasil e Drogaraia, outubro de 2026.

**A leitura honesta, e ela é desconfortável:** a dr.GUT está no topo da faixa de
preço, e a Pura Fiber entrega **mais fibra por dose (6,8 g contra 5,8 g) por
metade do preço de tabela**. Um comprador comparando lado a lado vai ver isso.

**E aqui está o problema da tabela comparativa atual do site:** ela compara o
dr.GUT com "Greens aleatório", que é o adversário mais fácil possível. Contra um
greens, ganhar em gramas de fibra é trivial. Contra um suplemento de fibra de
verdade, o dr.GUT não ganha em gramas nem em preço.

**Onde o dr.GUT ganha de verdade, e é nisso que a LP deve apostar:**
1. **3 fibras com funções diferentes**, não uma só. Volume (polidextrose) +
   alimento bacteriano (inulina) + maciez sem gel (PHGG). A Pura Fiber é acácia
   sozinha.
2. **4 micronutrientes em dose cheia**, três deles a 100% do VD. Um suplemento
   de fibra puro não tem nada disso.
3. **A experiência de tomar.** Laranja de verdade, dissolve em 30 s, sem gosma.
   O motivo número um de abandono de fibra é a textura, e a marca atacou isso de
   propósito ao escolher PHGG.
4. **Garantia incondicional de 30 dias.** Raro na categoria.
5. **Marca, mascote e conteúdo.** Ninguém na lista acima tem o GUT nem 5 artigos
   explicando o mecanismo.

Recomendação: **manter a comparação, mas trocar o adversário**. Comparar com
"fibra de um ingrediente só" e com laxante, que são os dois concorrentes reais do
comprador, em vez de um greens genérico. E usar preço por dose (R$ 4,90, ou
R$ 3,74 no kit de 3), que é a métrica onde o produto se defende melhor.

### 7.4 O dado para o gráfico (único número externo que a LP vai usar)

O brasileiro consome em média **15 g de fibra por dia**, contra uma recomendação
de **25 g a 30 g**, cerca de metade.
Fonte: IBGE, Pesquisa de Orçamentos Familiares, citada pela própria dr.GUT no
artigo "Por que a gente incha (e como resolver de verdade)".

Esse é o gráfico honesto que a Parte C regra 10 pede: barras partindo do zero,
consumo real contra recomendação, e a dose de dr.GUT (5,8 g) mostrada como o
pedaço que ela cobre do buraco. Um gráfico só, do claim central, com fonte na
legenda. Nada de gráfico decorativo.

### 7.5 Como o cliente descreve o problema

Vocabulário real, tirado do material da própria marca, para a copy soar como o
cliente e não como bula:
"barriga estufada", "a roupa aperta", "me sinto pesada", "parecia grávida",
"intestino preso", "só funciona se forçar", "travado", "inchada", "é assim
mesmo", "já tentei de tudo", "melhora um dia, depois volta", "pego tudo que
passa", "cansaço depois de comer".

Gatilho temporal que aparece em todo lugar e deve estruturar o hero: **o inchaço
piora ao longo do dia e estoura à noite.** "Você acorda com a barriga normal e,
ao longo do dia, ela vai crescendo, até a roupa apertar à noite."

### 7.6 As objeções mais fortes do comprador

Em ordem de força, com a resposta que o material já sustenta:

1. **"Já tentei fibra e não funcionou / me deu gases."** Resposta: a marca avisa
   antes, explica que é a fibra agindo, e manda começar com meia dose. Mais a
   escolha de PHGG, que não vira gel. Esta é a objeção número um e merece ser a
   pergunta 1 do FAQ.
2. **"É só mais um greens."** Resposta pronta e boa: "a diferença é número, não
   discurso: em vez de dezenas de ingredientes em pitadas, concentramos 3 fibras
   em 5,8g reais e 4 nutrientes em dose cheia."
3. **"Está caro."** Resposta: R$ 4,90 por dose, R$ 3,74 no kit de 3, e a garantia
   de 30 dias transfere o risco. Esta objeção é real (ver 7.3) e a LP não deve
   fingir que não existe.
4. **"Quanto tempo leva?"** Resposta: a marca se recusa a prometer prazo, e isso
   é uma força, não uma fraqueza. "corpo não é planilha."
5. **"Posso tomar todo dia? Tem cafeína?"** Zero cafeína, feito para uso diário,
   pode tomar à noite.
6. **"Substitui comida?"** Não, e a marca diz isso antes de ser perguntada.
7. **"Só tem 1 avaliação."** Objeção real e visível. Sem mais reviews, a LP deve
   apoiar prova em fórmula, garantia e transparência, não em volume social.

---

## 8. Imagens disponíveis

138 arquivos em `client-assets/images/` (63 PNG, 65 SVG de ícones, 10 WebP).
Muitos são o mesmo arquivo em tamanhos diferentes, servidos pelo CDN da Shopify.

Os que importam, por função:
- **Produto:** `imgi_13_Img_2.png` (1,9 MB, maior resolução), `imgi_14_Img_3.png`,
  `imgi_15_Img_4.png`, `imgi_12_Img_1_*.png`, `imgi_17_Img_5_*.png`
- **Antes e depois:** `imgi_23_ba-antes.webp` e `imgi_22_ba-depois.webp`
- **Modo de uso:** `imgi_24_step1-hand.webp`, `imgi_25_step2-hand.webp`,
  `imgi_26_step3-hand.webp` (os 3 passos do preparo)
- **Kits:** `imgi_18_kit1.png`, `imgi_19_kit2.png`, `imgi_20_kit3.png`
- **Selos:** `imgi_42_selo1_*.png`, `imgi_43_selo2_*.png`, `imgi_44_selo3.png`
- **Logo:** `imgi_2_Logo.png`, `imgi_47_Logo.png`, `imgi_48_Logo.png`
- **Banner:** `imgi_3_bannermenu_*.png`
- **Rodapé:** `imgi_139_FOOTER.webp`
- **Ícones:** os 65 SVGs, que resolvem a regra 7 do contrato (uma só família)

Falta, e seria gerado no Passo 5b: momentos de lifestyle (a pessoa depois do
jantar, a rotina da manhã). As fotos reais cobrem produto e preparo.

---

## 9. Lista "precisa do cliente"

Nada disso será inventado. Em ordem de impacto:

1. **Criativos vencedores da dr.GUT.** Sem eles não existe message match
   verificável, que é o critério de maior peso do QC. Bloqueia o hero final.
2. **Fonte do "92% notaram menos inchaço após 3 semanas de uso*".** O asterisco
   não leva a nota nenhuma no site e o número não aparece em nenhum artigo.
   Preciso de pesquisa, n e data. **Até lá, fora da LP.**
3. **Mais avaliações reais.** Existe 1. O playbook pede 6 a 8. Exportar do
   Judge.me se houver mais, ou a LP trabalha com uma só, com honestidade.
4. **Preço oficial do kit de 3:** R$ 112,33 ou R$ 112,34.
5. **Frete grátis no kit de 2:** R$ 247,00 exatos contam como "acima de R$ 247"?
6. **IDs reais** de produto, variante e selling plan da Shopify.
7. **Permissão de uso** dos selos e de qualquer logo de autoridade. O material
   atual não tem citação de especialista nem de publicação com logo, então a
   faixa de autoridade da Parte A1 fica sem conteúdo real. Se não houver, eu
   corto a seção em vez de inventar.
8. **Quebra em gramas das 3 fibras**, se existir. Não é obrigatório na LP, mas
   decide se dá para falar de cada fibra com mais precisão.
