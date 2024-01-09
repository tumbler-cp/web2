package com.example.labweb2;

import com.example.labweb2.beans.Point;
import com.example.labweb2.beans.Table;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@MultipartConfig
@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        double x, y, r;
        x = Double.parseDouble(req.getParameter("x"));
        y = Double.parseDouble(req.getParameter("y"));
        r = Double.parseDouble(req.getParameter("r"));

        boolean hit = false;
        if (x >= 0 && y >= 0 && x <= r && y <= r) hit = true;
        else if (x >= 0 && y <= 0 && Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2)) hit = true;
        else if (x < 0 && y < 0 && (-2 * x - r <= y)) hit = true;

        HttpSession session = req.getSession(true);
        Table table = (Table) session.getAttribute("table");

        if (table == null) {
            table = new Table();
            session.setAttribute("table", table);
        }

        Point point = new Point(x, y, r, hit);
        table.addPoint(point);
        resp.getWriter().write(point.toString());
        resp.setStatus(200);
    }
}
