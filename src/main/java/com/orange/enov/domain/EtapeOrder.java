package com.orange.enov.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EtapeOrder.
 */
@Entity
@Table(name = "etape_order")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class EtapeOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @JsonIgnoreProperties(value = { "etapeDefinitions" }, allowSetters = true)
    @OneToOne
    @JoinColumn
    private ParcoursDefinition parcoursDefinition;

    @JsonIgnoreProperties(value = { "blocDefinitions", "parcoursDefinition" }, allowSetters = true)
    @OneToOne
    @JoinColumn
    private EtapeDefinition current;

    @JsonIgnoreProperties(value = { "blocDefinitions", "parcoursDefinition" }, allowSetters = true)
    @OneToOne
    @JoinColumn
    private EtapeDefinition next;

    @Column(name = "transition_order")
    private Integer transitionOrder;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public EtapeOrder id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ParcoursDefinition getParcoursDefinition() {
        return this.parcoursDefinition;
    }

    public void setParcoursDefinition(ParcoursDefinition parcoursDefinition) {
        this.parcoursDefinition = parcoursDefinition;
    }

    public EtapeOrder parcoursDefinition(ParcoursDefinition parcoursDefinition) {
        this.setParcoursDefinition(parcoursDefinition);
        return this;
    }

    public EtapeDefinition getCurrent() {
        return this.current;
    }

    public void setCurrent(EtapeDefinition etapeDefinition) {
        this.current = etapeDefinition;
    }

    public EtapeOrder current(EtapeDefinition etapeDefinition) {
        this.setCurrent(etapeDefinition);
        return this;
    }

    public EtapeDefinition getNext() {
        return this.next;
    }

    public void setNext(EtapeDefinition etapeDefinition) {
        this.next = etapeDefinition;
    }

    public EtapeOrder next(EtapeDefinition etapeDefinition) {
        this.setNext(etapeDefinition);
        return this;
    }

    public Integer getTransitionOrder() {
        return transitionOrder;
    }

    public void setTransitionOrder(Integer transitionOrder) {
        this.transitionOrder = transitionOrder;
    }

    public EtapeOrder transitionOrder(Integer transitionOrder) {
        this.transitionOrder = transitionOrder;
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EtapeOrder)) {
            return false;
        }
        return id != null && id.equals(((EtapeOrder) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EtapeOrder{" +
            "id=" + getId() +
            ", transitionOrder='" + getTransitionOrder() + "'" +
            "}";
    }
}
