<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>ВЕБ ЛР 2</title>
    <link rel="stylesheet" type="text/css" href="stylesheet/index.css">
</head>
<body>
<div class="content">
    <div class="header">
        <div>Ходжаев Абдужалол Абдужаборович</div>
        <div>ВАРИАНТ № 431877</div>
    </div>
    <div class="input">
        <div id="canvas">
            <svg id="svg" width="250" height="250">
                <!-- ФИГУРЫ -->
                <polygon points="125,25 225,25 225,125 125,125" fill="#fe640b" stroke="none" opacity="1"></polygon>
                <polygon points="75,125 125,125 125,225" fill="#fe640b" stroke="none" opacity="1"></polygon>
                <path d="M125,125 L225,125 A100,100 0 0,1 125,225 Z" fill="#fe640b" stroke="none" opacity="1"></path>

                <!-- ЛИНИИ -->
                <line stroke="black" x1="125" x2="125" y1="0" y2="250"></line>
                <line stroke="black" x1="0" x2="250" y1="125" y2="125"></line>

                <!-- ОТМЕТКИ -->
                <line stroke="black" x1="25" x2="25" y1="123" y2="127"></line>
                <line stroke="black" x1="75" x2="75" y1="123" y2="127"></line>
                <line stroke="black" x1="175" x2="175" y1="123" y2="127"></line>
                <line stroke="black" x1="225" x2="225" y1="123" y2="127"></line>

                <line stroke="black" x1="123" x2="127" y1="25" y2="25"></line>
                <line stroke="black" x1="123" x2="127" y1="75" y2="75"></line>
                <line stroke="black" x1="123" x2="127" y1="175" y2="175"></line>
                <line stroke="black" x1="123" x2="127" y1="225" y2="225"></line>

                <!-- СТРЕЛКИ -->
                <polygon points="125,0 120,10 130,10"></polygon>
                <polygon points="250,125 240,120 240,130"></polygon>

                <!-- ПОДПИСЬ -->
                <text x="25" y="120" fill="black">-R</text>
                <text x="75" y="120" fill="black">-R/2</text>
                <text x="175" y="120" fill="black">R/2</text>
                <text x="225" y="120" fill="black">R</text>

                <text x="130" y="25" fill="black">R</text>
                <text x="130" y="75" fill="black">R/2</text>
                <text x="130" y="175" fill="black">-R/2</text>
                <text x="130" y="225" fill="black">-R</text>
            </svg>
        </div>
        <div>
            <form id="form" class="form" method="post">
                <div>
                    <label for="x-input">X : </label>
                    <select id="x-input">
                        <option value="-4">-4</option>
                        <option value="-3">-3</option>
                        <option value="-2">-2</option>
                        <option value="-1">-1</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                <div>
                    <label for="y-input">Y : </label>
                    <input id="y-input" type="number" onchange="setYValue()">
                </div>

                <div>
                    <label for="r1">R : </label>
                    <input id="r1" type="radio" name="r-input" value="1" onclick="setRValue()">
                    <span>1</span>
                    <label for="r15"></label>
                    <input id="r15" type="radio" name="r-input" value="1,5" onclick="setRValue()">
                    <span>1.5</span>
                    <label for="r2"></label>
                    <input id="r2" type="radio" name="r-input" value="2" onclick="setRValue()">
                    <span>2</span>
                    <label for="r25"></label>
                    <input id="r25" type="radio" name="r-input" value="2,5" onclick="setRValue()">
                    <span>2.5</span>
                    <label for="r3"></label>
                    <input id="r3" type="radio" name="r-input" value="3" onclick="setRValue()">
                    <span>3</span>
                </div>

                <div id="state">
                </div>

                <div>
                    <button id="check" role="button">ПРОВЕРИТЬ</button>
                </div>
            </form>
        </div>
    </div>
    <div class="table">
        <jsp:include page="table.jsp"/>
    </div>
</div>
<footer>
    © 2023 Ходжаев Абдужалол Абдужаборович<br>
    Все права защищены. Информация на данном сайте защищена<br>
    авторским правом и может быть использована только<br>
    с письменного разрешения правообладателя.
</footer>
<script type="text/javascript" src="scripts/client.js"></script>
<script type="text/javascript" src="scripts/point.js"></script>
</body>
</html>
