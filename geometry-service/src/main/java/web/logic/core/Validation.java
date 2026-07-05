package web.logic.core;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Data
public class Validation {
    private float x;
    private float y;
    private float r;
    private final String floatPattern = "^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?$";
    private final Set<Float> availableX = Set.of(-3F, -2.5F, -2F, -1.5F, -1F, -0.5F, 0F, 0.5F, 1F, 1.5F, 2F, 2.5F, 3F, 3.5F, 4F);
    private final Set<Float> availableR = Set.of(1F, 2F, 3F, 4F, 5F);
    private final List<String> errors = new ArrayList<>();

    public Validation() {}

    public void validateXYR(Map<String, String> coordinates) {
        validateX(coordinates);
        validateY(coordinates);
        validateR(coordinates);
    }

    private void validateX(Map<String, String> coordinates) {
        String xValue = coordinates.get("x");
        if (xValue.trim().isEmpty()) {
            errors.add("Координата X отсутствует!");
            return;
        }
        if (!xValue.matches(floatPattern)) {
            errors.add("Координата X должна быть числом с плавающей точкой!");
            return;
        }
        float parsedX = Float.parseFloat(xValue);
        if (parsedX < -3 || parsedX > 4) {
            errors.add("Координата X должна быть в промежутке от -3 до 4, включая границы");
            return;
        }
        this.x = parsedX;
    }

    private void validateY(Map<String, String> coordinates) {
        String yValue = coordinates.get("y");
        if (yValue == null) {
            errors.add("Координата Y отсутствует!");
            return;
        }
        if (!yValue.matches(floatPattern)) {
            errors.add("Координата Y должна быть числом с плавающей точкой!");
            return;
        }
        try {
            float parsedY = Float.parseFloat(yValue);
            if (parsedY <= -5 || parsedY >= 5) {
                errors.add("Координата Y должна быть в диапазоне [-5; 5]");
                return;
            }
            this.y = parsedY;
        } catch (NumberFormatException e) {
            errors.add("Координата Y должна быть числом!");
        }
    }

    private void validateR(Map<String, String> coordinates) {
        String rValue = coordinates.get("r");
        if (rValue.trim().isEmpty()) {
            errors.add("Радиус R отсутствует!");
            return;
        }
        if (!rValue.matches(floatPattern)) {
            errors.add("Радиус R должен быть числом с плавающей точкой!");
            return;
        }
        float parsedR = Float.parseFloat(rValue);
        if (!availableR.contains(parsedR)) {
            errors.add("Радиус R должен быть равен целому числу от 1 до 5, включая границы");
            return;
        }
        this.r = parsedR;
    }

    public boolean hasErrors() {
        return !errors.isEmpty();
    }
}