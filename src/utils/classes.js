import { re } from "mathjs"

//MATERIAL CLASSES
export class material{
    constructor(type,name,young,sscurve){
        this.type=type
        this.name=name
        this.young=young
        this.sscurve = sscurve
    }

    set_young(young){
        this.young = young
    }

    get_young(young){
        return this.young
    }

}

export class concrete extends material{
    constructor(){
        super()
        this.type = "concrete"
    }
}

export class steel extends material{
    constructor(){
        super()
    }
}

export class steelg50 extends material{
    constructor(){
        super()
        this.young=200000
    }
}

//SECTION CLASSES
export class xsection{
    constructor(type,name,material,area){
        this.type = type
        this.name = name
        this.material = material
        this.area = area
    }

    get_area(){
        return this.area
    }

}

export class rectangular_section extends xsection{
    constructor(b,h,material){
        super()
        this.b = b
        this.h = h
        this.area = b*h
        this.inertiax = (1/12)*b*h**3
        this.inertiay = (1/12)*h*b**3 
        this.material = material
        this.young = material.young
        }
    
    get_area(){
        return this.area
    }

    get_inertiax(){
        return (1/12)*this.b*this.h**3
    }

    get_inertiax(){
        return (1/12)*this.h*this.b**3
    }
}  

//STRUCTURAL CLASSES
export class element{

    constructor(id,xsection,length,angle,node0,nodef,loadp=[],loadd=[]){
        this.id=id
        this.xsection=xsection
        this.length=length
        this.angle=angle
        this.node0=node0
        this.nodef=nodef
        this.area = xsection.area
        this.inertiax=xsection.inertiax
        this.inertiax=xsection.inertiax
        this.material = xsection.material
        this.young = xsection.young
        this.loadp=this.loadp
        this.loadd=this.loadd
    }

    get_lenght(){
        x0 = this.node0.x0
        xf = this.node0.xf
        y0 = this.node0.y0
        yf = this.node0.yf
        return ((xf-x0)**2+(yf-y0)**2)**0.5
    }

    get_young(){
        return this.xsection.material.get_young()
    }

    get_area(){
        return this.xsection.get_area()
    }

    get_inertiax(){
        return this.xsection.get_inertiax()
    }

    get_inertiay(){
        return this.xsection.get_inertiay()
    }

    set_load(loadp,loadd) {
        this.loadp = loadp
        this.loadd = loadd
    }

    set_addload(load){
        if (load.type == "punctual_load"){
            this.loadp.push(load)
        }else{
            this.loadd.push(load)
        }
    }
}

export class node{
    constructor(x0,y0,xf,yf){
        this.x0 = x0
        this.y0 = y0
        this.xf = xf
        this.yf = yf
    }
}

//LOAD CLASSES
export class load{
    constructor(id, type){
        this.id = id
        this.type = type
    }
}

export class distributed_load extends load{
    constructor(n0,nf){
        super()
        this.n0 = n0
        this.nf = nf
    }
}

export class rectangular_load extends distributed_load{
    constructor(value){
        super()
        this.value = value
    }
}

export class punctual_load extends load{
    constructor(value,node){
        super()
        this.type = "punctual"
        this.value = value
        this.node = node
    }
}