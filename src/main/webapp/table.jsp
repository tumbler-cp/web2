<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<jsp:useBean id="table" class="com.example.labweb2.beans.Table" scope="session"/>
<table>
    <thead>
    <tr>
        <td>X</td>
        <td>Y</td>
        <td>R</td>
        <td>HIT</td>
    </tr>
    </thead>
    <tbody>
    <c:if test="${not empty table}">
        <c:forEach items="${table.points}" var="point">
            <tr>
                <td>${point.x}</td>
                <td>${point.y}</td>
                <td>${point.r}</td>
                <td style="color: ${point.hit ? "green" : "red"}" >${point.hit}</td>
            </tr>
        </c:forEach>
    </c:if>
    </tbody>
</table>
