package com.orange.enov;

import java.util.ArrayList;
import java.util.List;

public class LIstTest {

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        list.add("info");
        list.add("configuration");
        list.add(1, "test");

        System.out.println("liste = " + list);
    }
}
