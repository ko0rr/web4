package web.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "points", schema = "geometry_schema")
public class Point {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float x;
    private float y;
    private float r;
    private boolean hit;

    @Column(name = "server_time")
    private String serverTime;

    @Column(name = "script_time")
    private long scriptTime;

    @Column(name = "owner_username")
    private String ownerUsername;
}