package com.example.labweb2;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/controller")
@MultipartConfig
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        if (x.isEmpty() || y.isEmpty() || r.isEmpty()) {
            doError(response);
            return;
        }

        double X, Y, R;

        try {
            X = Double.parseDouble(x);
            Y = Double.parseDouble(y);
            R = Double.parseDouble(r);

            if (!(X >= -4 && X <= 4)) doError(response);
            if (!(Y >= -3 && Y <= 5)) doError(response);

            double[] arr = new double[]{1, 1.5, 2, 2.5, 3};
            boolean key = false;
            for (double c : arr) {
                if (R == c) {
                    key = true;
                    break;
                }
            }
            if (!key) doError(response);
        } catch (ClassCastException | NumberFormatException c) {
            doError(response);
            return;
        }

        var dispatcher = request.getRequestDispatcher("/check");
        dispatcher.forward(request, response);

    }

    private void doError(HttpServletResponse response) throws IOException {
        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Некорректный запрос");
    }
}
