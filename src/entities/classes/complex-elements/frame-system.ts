import { IElement, INode, IStructure } from "@/entities/interfaces";
import { coordinates2D, supportType } from "@/entities/types";
import { uniques } from "@/utils";
import { constraints } from '@config'
import { ElementNode } from "../nodes/element-node";
import { Section } from "../sections/section";
import { Element } from "./element";
import { Structure } from "./structure";

export class FrameSystem extends Structure implements IStructure {

    //TODO: all
    constructor(
        numberLevels: number,
        heightLevels: number,
        numberSpans: number,
        distanceSpans: number,
        columnSection: Section,
        beamSection: Section,
        defaultSupport: supportType
    ){
        let a = new ElementNode({x: 0 ,y: 0})
        let b = new ElementNode({x: 0 ,y: heightLevels})
        let c = new ElementNode({x: distanceSpans ,y: 0})
        let d = new ElementNode({x: distanceSpans ,y: heightLevels})

        a.constraints = {...constraints[defaultSupport]}
        c.constraints = {...constraints[defaultSupport]}

        let coll = new Element(a,b,columnSection)
        let colr = new Element(b,c,columnSection)
        let vga = new Element(c,d,beamSection)
        super(coll,vga,colr)
    }
    
    get levels(){
        let all = this.nodes
            .map((node) => node.coordinates('static').y)
        return uniques(...all)
    }

    get spans(){
        let all = this.nodes
            .map((node) => node.coordinates('static').x)
        return uniques(...all)
    }

    public levelNodeMass(level: number){
        let nodes = this.filterNodes(level=level)
        let mass = 0
        nodes.forEach(n => {
            mass = n.nodeMass != undefined ? mass + n.nodeMass : mass
        });
        return mass
    }
    
    
}

const createNodes = (numberLevels: number,
    heightLevels: number,
    numberSpans: number,
    distanceSpans: number,
)=>{
    let i = 0
    let j = 0
    let xi = 0
    let yi = 0
    let n = new ElementNode({x: xi, y: yi})
    let nodes: INode[] = [n]
    xi = xi +distanceSpans
    while (i<=numberLevels) {
        while (j<=numberSpans) {
            n = new ElementNode({x: xi, y: yi})
            nodes.push(n)
            xi = xi+distanceSpans
            j++
        }
        xi = 0
        yi = yi+heightLevels
        i++
    }
    return nodes
}

const constraintLevelNodes = (
    nodes: INode[],
    level: number,
    type: supportType = 'fixed'
)=>{
    nodes.forEach(n => {
        if (n.coordinates('static').y == level) {
            n.constraints = {...constraints[type]}
        } else {
            
        }
    });
    return nodes
}

const createElements = (
    n: null
)=>{
    return null
}
