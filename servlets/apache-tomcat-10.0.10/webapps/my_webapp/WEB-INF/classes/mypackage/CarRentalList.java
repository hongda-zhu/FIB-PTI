package mypackage;

import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;

import java.io.FileWriter;
import java.io.IOException;

import jakarta.servlet.http.HttpSession;

public class CarRentalList extends HttpServlet {

  int cont = 0;

  public void doGet(HttpServletRequest req, HttpServletResponse res)
                    throws ServletException, IOException {
    
    res.setContentType("text/html");
    PrintWriter out = res.getWriter();
    
    String username = req.getParameter("userid");
    String passw = req.getParameter("password");

    String user= "admin";
    String pass= "1234";
    
    if(username.equals(user) && pass.equals(passw)){
  		handleReadRental(res);
    }else{
		out.println("<html><big>User = admin</big><br><br>"+
                  " <big>pass = 1234</big></html>");
	}

    
  }

  public void handleReadRental(HttpServletResponse res) {
    JSONParser parser = new JSONParser();
    
    try {    
        res.setContentType("text/html");
        PrintWriter out = res.getWriter();
        
        // Inicio del HTML con estilos
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Rental List</title>");
        out.println("<style>");
        out.println(".rental-item { margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; }");
        out.println(".rental-item label { font-weight: bold; width: 150px; display: inline-block; }");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        
        out.println("<h1>Rental List:</h1>");
        
        String relativePath = "/WEB-INF/classes/mypackage/rentals.json";
        File file = new File(getServletContext().getRealPath(relativePath));
        
        Object obj = parser.parse(new FileReader(file));
        JSONObject jsonObject = (JSONObject) obj;
        JSONArray rentals = (JSONArray) jsonObject.get("rentals");
        
        // Iterar sobre cada alquiler
        for (Object rentalObj : rentals) {
            JSONObject rental = (JSONObject) rentalObj;
            out.println("<div class='rental-item'>");
            out.println("<p><label>CO2 Rating:</label> " + rental.get("co2_rating") + "</p>");
            out.println("<p><label>Engine:</label> " + rental.get("engine") + "</p>");
            out.println("<p><label>Number of days:</label> " + rental.get("dias_alquiler") + "</p>");
            out.println("<p><label>Number of units:</label> " + rental.get("num_vehi") + "</p>");
            out.println("<p><label>Discount:</label> " + rental.get("descuento") + "%</p>");
            out.println("<hr>");
            out.println("</div>");
        }
        
        // Añadir enlace para volver al inicio
        out.println("<br><a href='carrental_home.html'>Back to Home</a>");
        out.println("</body></html>");

    } catch (Exception e) {
        try {
            PrintWriter out = res.getWriter();
            out.println("<html><body>");
            out.println("<h1>Error</h1>");
            out.println("<p>Error reading JSON file: " + e.getMessage() + "</p>");
            out.println("<a href='carrental_home.html'>Back to Home</a>");
            out.println("</body></html>");
            e.printStackTrace(new PrintWriter(out));
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }
  }

  public void doPost(HttpServletRequest req, HttpServletResponse res)
        throws ServletException, IOException {
    doGet(req, res);
  }
}
