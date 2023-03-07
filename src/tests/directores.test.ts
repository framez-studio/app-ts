import { Concrete, Element, ElementNode, FHE, RectangularSectionCR, RectangularSpanLoad } from '@/entities/classes'
import { FrameSystem } from '@/entities/classes/complex-elements/frame-system'
import { Hinge } from '@/entities/classes/others/moment-curvature'
import { normalizeLoads2Unit, PushoverSolver } from '@/entities/classes/solvers/pushover-solver'
import { StaticSolver } from '@/entities/classes/solvers/static-solver'
import { Concrete21Curve, Concrete21Tarea, SteelG60 } from '@/utils/material'
import clone from 'just-clone'
import { forEach } from 'mathjs'
import { describe, expect, it } from 'vitest'

describe('Tarea osi osi', () => {
    //DIMENSIONES GENERALES ESTRUCTURA
    let hlevel = 3
    let h = hlevel*2

    //SE CREAN NODOS
    let n1 = new ElementNode({x:0,y:0})
    let n2 = new ElementNode({x:0,y:hlevel})
    let n3 = new ElementNode({x:0,y:hlevel*2})

    let n4 = new ElementNode({x:4,y:0})
    let n5 = new ElementNode({x:4,y:hlevel})
    let n6 = new ElementNode({x:4,y:hlevel*2})

    let n7 = new ElementNode({x:10,y:0})
    let n8 = new ElementNode({x:10,y:hlevel})
    let n9 = new ElementNode({x:10,y:hlevel*2})
    
    //SE RESTRINGEN GRADOS DE LIBERTAD
    n1.constraints.dx = true
    n1.constraints.dy = true
    n1.constraints.rz = true

    n4.constraints.dx = true
    n4.constraints.dy = true
    n4.constraints.rz = true

    n7.constraints.dx = true
    n7.constraints.dy = true
    n7.constraints.rz = true


    //MATERIALES
    let mat = new Concrete("Concrete21MPA",21,24,20e6,0.003)
    //let steel = SteelG60

    //DIMENSIONES DE SECCIONES
    let bcol = 0.40
    let hcol = 0.40
    let bvga = 0.30
    let hvga = 0.40
    
    //SECCIONES TRANSVERSALES ELEMENTOS
    let XScol = new RectangularSectionCR(bcol,hcol,mat)
    let XSvga = new RectangularSectionCR(bvga,hvga,mat)

    //SE CREAN COLUMNAS
    let c1 = new Element(n1,n2,XScol)
    let c2 = new Element(n2,n3,XScol)

    let c3 = new Element(n4,n5,XScol)
    let c4 = new Element(n5,n6,XScol)

    let c5 = new Element(n7,n8,XScol)
    let c6 = new Element(n8,n9,XScol)


    //SE CREAN VIGAS
    let b1 = new Element(n2,n5,XSvga)
    let b2 = new Element(n5,n8,XSvga)

    let b3 = new Element(n3,n6,XSvga)
    let b4 = new Element(n6,n9,XSvga)

    //SE JUNTAN LOS ELEMENTOS XD
    let elementsArray = [c1,c2,c3,c4,c5,c6,b1,b2,b3,b4]

    //ROTULAS PLASTICAS
    let hingeCol = new Hinge(250,0,-250,0,'Moment')
    let hingeVga1= new Hinge(100,0,-150,0,'Moment') //4m
    let hingeVga2= new Hinge(80,0,-80,0,'Moment') //6m
    
    //INFORMACION DEL PORTICO
    let frm = new FrameSystem(...elementsArray)
    
    //ASIGNACION DE ROTULAS
    b1.assignHinge('initial',clone(hingeVga1))
    b1.assignHinge('final',clone(hingeVga1))
    b3.assignHinge('initial',clone(hingeVga1))
    b3.assignHinge('final',clone(hingeVga1))

    b2.assignHinge('initial',clone(hingeVga2))
    b2.assignHinge('final',clone(hingeVga2))
    b4.assignHinge('initial',clone(hingeVga2))
    b4.assignHinge('final',clone(hingeVga2))

    frm.elements.forEach(e => {
        if (e.inclination == 0) {

        }else{
            e.assignHinge('initial',clone(hingeCol))
            e.assignHinge('final',clone(hingeCol))
        }
    });

    //CARGAS
    //n3.addLoads({fx:1})

    //AÑADIR NODO OBJETIVO
    let nobj=frm.node({x: 0, y:h})

    /*
    it('should calculate capacity curve', () => {
        PushoverSolver.Run(frm,{x: 0, y:h},'stability')

        let result = PushoverSolver.capacityCurve()
        let curve = [
            [0,0],
            [9.3,136.4],
            [9.4,136.9],
            [9.5,137.4],
            [16.8,145.9],
        ]
        expect(result[0][0]).toBeCloseTo(curve[0][0],1)
	})
    */
    
    let wo = 20
    new RectangularSpanLoad(b1,wo,0,b1.length)
    new RectangularSpanLoad(b2,wo,0,b2.length)
    new RectangularSpanLoad(b3,wo,0,b3.length)
    new RectangularSpanLoad(b4,wo,0,b4.length)

    it('should calculate service capacity curve',()=>{
        normalizeLoads2Unit(frm,80)
        PushoverSolver.Run(frm,{x: 0, y:h},'service',80)
        let resultService = PushoverSolver.serviceCapacityCurve()
        frm.resetLoadstoZero()
        n3.addLoads({fx:1})
        PushoverSolver.Run(frm,{x: 0, y:h},'stability')
        let result = PushoverSolver.capacityCurve()
        let curve = [[0,0]]
        expect(result[0][0]).toBeCloseTo(curve[0][0],1)

    })
    
})

