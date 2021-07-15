(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/au572202/Nextcloud/Work/website/eve-main/src/main.ts */"zUnb");


/***/ }),

/***/ "1CK5":
/*!*********************************************!*\
  !*** ./src/app/services/drawing.service.ts ***!
  \*********************************************/
/*! exports provided: DrawingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawingService", function() { return DrawingService; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class DrawingService {
    constructor() {
        this.mode = 'light-mode';
    }
    draw(first = true) {
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('#svg').remove();
        this.width = window.innerWidth * 0.27;
        this.height = this.width * (450 / 330);
        this.offsetY = (window.innerHeight - this.height) / 2;
        this.offsetX = window.innerWidth * 0.58;
        this.scale = this.width / 330;
        if (window.innerWidth < 800) {
            this.width = window.innerWidth * 0.6;
            this.height = this.width * (450 / 330);
            this.offsetY = 0;
            this.offsetX = window.innerWidth * 0.2;
            this.scale = this.width / 330;
        }
        else if (window.innerWidth < 1000) {
            this.width = window.innerWidth * 0.5;
            this.height = this.width * (450 / 330);
            this.offsetY = this.width * 0.1;
            this.offsetX = window.innerWidth * 0.25;
            this.scale = this.width / 330;
        }
        else if (window.innerWidth < 1400) {
            this.width = window.innerWidth * 0.4;
            this.height = this.width * (450 / 330);
            this.offsetY = this.width * 0.1;
            this.offsetX = window.innerWidth * 0.3;
            this.scale = this.width / 330;
        }
        this.x = this.width * 0.19;
        this.y = this.x * 0.625;
        // else if (window.innerWidth < 1200) {
        // //   this.offsetY -= 110;
        //   this.offsetX = window.innerWidth * 0.60;
        // }
        this.svg = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#svgBg')
            .append('svg')
            .attr('width', window.innerWidth > 1400 ? window.innerWidth - 140 : window.innerWidth)
            .attr('height', () => window.innerHeight > window.innerWidth ? window.innerWidth * 0.9 : window.innerHeight)
            .attr('id', 'svg');
        // this.drawHair();
        this.drawEye();
        this.drawLines(first);
        setTimeout(() => {
            this.drawMouth();
            this.drawEar();
        }, (first ? 900 : 0));
        setTimeout(() => {
            this.drawHand();
        }, (first ? 1000 : 0));
        setTimeout(() => {
            this.drawCheek();
        }, (first ? 1400 : 0));
    }
    drawEye() {
        const eyeGroup = this.svg.append('g')
            .attr('transform', 'translate(' + [(this.offsetX + (this.width * 0.515)), (this.offsetY + (this.height * 0.208))] + ')');
        const path_eye = 'M' + (-this.x) + ', 0 Q' + (-0.6 * this.x) + ',' + (-this.y) + ' 0,' + (-this.y) + ' Q' + (0.6 * this.x) + ',' + (-this.y) + ' ' + this.x + ',0 Q' + (0.6 * this.x) + ',' + (this.y) + ' ' + '0,' + this.y +
            ' Q' + (-0.6 * this.x) + ',' + (this.y) + ' ' + (-this.x) + ', 0 Z';
        const path_eyelid = 'M' + (-this.x) + ', 0 Q' + (-0.6 * this.x) + ',' + (-this.y) + ' 0,' + (-this.y) + ' Q' + (0.6 * this.x) + ',' + (-this.y) + ' ' + this.x + ',0 Q' + (0.6 * this.x) + ',' + (-0.5 * this.y) + ' 0,' + (-0.5 * this.y) +
            ' Q' + (-0.6 * this.x) + ',' + (-0.5 * this.y) + ' ' + (-this.x) + ', 0 Z';
        const clipPath = eyeGroup.append('clipPath')
            .attr('id', 'ellipse-clip')
            .append('path')
            .attr('d', path_eye);
        const eye = eyeGroup.append('path')
            .attr('d', path_eye)
            .style('fill', '#9fddf9');
        const eyeColor = eyeGroup.append('circle')
            .attr('id', 'eyeColor')
            .attr('class', 'eye')
            .attr('cx', 0)
            .attr('cy', this.y * 0.15)
            .attr('r', this.y * 0.75)
            .style('fill', '#f27fb2')
            .style('shape-rendering', 'geometricPrecision')
            .attr('clip-path', 'url(#ellipse-clip)');
        const iris = eyeGroup.append('circle')
            .attr('id', 'iris')
            .attr('class', 'eye')
            .attr('cx', 0)
            .attr('cy', this.y * 0.15)
            .attr('r', () => this.mode === 'dark-mode' ? this.y * 0.5 : this.y * 0.35)
            .style('fill', '#000')
            .style('shape-rendering', 'geometricPrecision')
            .attr('clip-path', 'url(#ellipse-clip)');
        const eyelid = eyeGroup.append('path')
            .attr('id', 'eyelid')
            .attr('d', path_eyelid)
            .style('fill', '#832990')
            .style('stroke', '#832990')
            .style('stroke-width', 1)
            .style('shape-rendering', 'geometricPrecision');
        clearInterval(this.blinkInterval);
        this.blinkInterval = setInterval(() => {
            this.closeEye();
        }, this.getRndInteger(1500, 6000));
    }
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    closeEye() {
        const path_eyelid = 'M' + (-this.x) + ', 0 Q' + (-0.6 * this.x) + ',' + (-this.y) + ' 0,' + (-this.y) + ' Q' + (0.6 * this.x) + ',' + (-this.y) + ' ' + this.x + ',0 Q' + (0.6 * this.x) + ',' + (-0.5 * this.y) + ' 0,' + (-0.5 * this.y) +
            ' Q' + (-0.6 * this.x) + ',' + (-0.5 * this.y) + ' ' + (-this.x) + ', 0 Z';
        const path_eye = 'M' + (-this.x) + ', 0 Q' + (-0.6 * this.x) + ',' + (-this.y) + ' 0,' + (-this.y) + ' Q' + (0.6 * this.x) + ',' + (-this.y) + ' ' + this.x + ',0 Q' + (0.6 * this.x) + ',' + (this.y) + ' ' + '0,' + this.y +
            ' Q' + (-0.6 * this.x) + ',' + (this.y) + ' ' + (-this.x) + ', 0 Z';
        d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#eyelid').transition().ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeLinear"]).duration(100).attr('d', path_eye).transition().ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeLinear"]).duration(100).attr('d', path_eyelid);
    }
    changeMode(mode) {
        if (this.svg) {
            if (mode === 'dark-mode') {
                this.svg.select('#iris').transition().ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeLinear"]).duration(200).attr('r', (this.y * 0.5));
            }
            else {
                this.svg.select('#iris').transition().ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeLinear"]).duration(200).attr('r', (this.y * 0.35));
            }
        }
    }
    moveEye(mouseX, mouseY) {
        const xOffset = this.x * 0.45;
        const yOffset = this.y * 0.3;
        const leftOffset = window.innerWidth * 0.75 + (this.x / 2);
        const topOffset = window.innerHeight * 0.3 + (this.y / 2);
        let newX;
        let newY;
        if (mouseX < leftOffset) {
            newX = -xOffset + (mouseX / leftOffset * xOffset);
        }
        else {
            newX = (mouseX - leftOffset) / (window.innerWidth - leftOffset) * xOffset;
        }
        if (mouseY < topOffset) {
            newY = -yOffset + (mouseY / topOffset * yOffset) + (this.y * 0.15);
        }
        else {
            newY = (mouseY - topOffset) / (window.innerHeight - topOffset) * yOffset + (this.y * 0.15);
        }
        this.svg.select('#iris').attr('cx', newX).attr('cy', newY);
        this.svg.select('#eyeColor').attr('cx', newX).attr('cy', newY);
    }
    drawLines(first) {
        const path_nose = "M50.5,0.8L4.5,189.9L39.7,189.9";
        const path_eyebrow = "M152,36.5c-15.1-20-39-33-66-33C40.4,3.5,3.5,40.4,3.5,86v44.1";
        const lineGroup = this.svg.append('g')
            .attr('transform', 'translate(' + [this.offsetX, (this.offsetY + (this.height * 0.086))] + '), scale(' + this.scale + ')');
        const nose = lineGroup.append('path')
            .attr('d', path_nose)
            .attr('id', 'nose')
            .attr('stroke', first ? 'transparent' : '#ccc')
            .attr('stroke-width', this.width * 0.015 > 8 ? this.width * 0.015 : 8)
            .attr('fill', 'none')
            .style('shape-rendering', 'geometricPrecision');
        const lineGroup2 = this.svg.append('g')
            .attr('transform', 'translate(' + [(this.offsetX + (this.width * 0.224)), this.offsetY] + '), scale(' + this.scale + ')');
        const eyebrow = lineGroup2.append('path')
            .attr('d', path_eyebrow)
            .attr('id', 'eyebrow')
            .attr('stroke', '#ccc')
            .attr('stroke-width', this.width * 0.015 > 8 ? this.width * 0.015 : 8)
            .attr('fill', 'none')
            .style('shape-rendering', 'geometricPrecision');
        const totalLength_path_nose = nose.node().getTotalLength();
        const totalLength_path_eyebrow = eyebrow.node().getTotalLength();
        if (first) {
            eyebrow.attr('stroke-dasharray', totalLength_path_eyebrow + ' ' + totalLength_path_eyebrow)
                .attr('stroke-dashoffset', totalLength_path_eyebrow)
                .transition()
                .duration(600)
                .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeLinear"])
                .attr('stroke-dashoffset', 0);
            setTimeout(() => {
                nose.attr('stroke', '#ccc')
                    .attr('stroke-dasharray', totalLength_path_nose + ' ' + totalLength_path_nose)
                    .attr('stroke-dashoffset', totalLength_path_nose)
                    .transition()
                    .duration(500)
                    .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeLinear"])
                    .attr('stroke-dashoffset', 0);
            }, 600);
        }
    }
    drawHair() {
        const path = "M254.2,141v232.7c-0.4,41.2,27.8,60.8,65.1,60.8c70.2,0,78.6-66.9,76.1-65.3c-31.3,19.2-77.7,11.1-60.2-60.2c8-37.6,23-84.6,23-127.6C358,81.2,276.9,0,176.8,0C90.5,0,18.3,60.2,0,141h254H254.2z";
        this.svg.append('path')
            .attr('d', path)
            .style('fill', '#000')
            .attr('transform', 'translate(' + [(this.offsetX + (this.width * 0.0175)), (this.offsetY + (this.height * -0.3))] + '), scale(' + this.scale + ')');
    }
    drawMouth() {
        const path = "M33.3,3.6L33.3,3.6C29.7,1.2,25.2-0.2,20.5,0C9.6,0.5,0.6,9.3,0,20.2c-0.7,12.3,9.1,22.5,21.3,22.5C9.2,42.7-0.6,52.9,0,65.3C0.6,76,9.3,84.8,20,85.4c5.3,0.3,10.2-1.3,14.1-4.2l0,0l45.8-38.5L35,4.9C34.5,4.5,33.9,4,33.3,3.6L33.3,3.6z";
        this.svg.append('path')
            .attr('d', path)
            .style('fill', '#f27fb2')
            // .attr('stroke', '#000')
            // .attr('stroke-width', window.innerWidth * 0.004)
            // .attr('fill', 'none')
            .attr('transform', 'translate(' + [(this.offsetX + (this.width * 0.174)), (this.offsetY + (this.height * 0.556))] + '), scale(' + this.scale + ')');
    }
    drawEar() {
        const path = "M8.5,0C28,0,43.8,15.8,43.8,35.2c0,11.8-5.8,22.3-14.7,28.6c2.3,3.7,3.7,8.1,3.7,12.9c0,13.4-10.8,24.2-24.2,24.2H0L0,0L8.5,0z";
        const x = 260.839 / 450 * this.width;
        this.svg.append('path')
            .attr('d', path)
            .style('fill', '#ccc')
            // .attr('stroke', '#000')
            // .attr('stroke-width', window.innerWidth * 0.004)
            // .attr('fill', 'none')
            .attr('transform', 'translate(' + [(this.offsetX + (this.width * 0.787)), (this.offsetY + (this.height * 0.222))] + '), scale(' + this.scale + ')');
    }
    drawCheek() {
        const group = this.svg.append('g')
            .attr('transform', 'translate(' + [(this.offsetX + (this.width * 0.485)), (this.offsetY + (this.height * 0.535))] + ')');
        group.append('circle')
            .attr('r', this.width * 0.22)
            .attr('cx', 0)
            .attr('cy', 0)
            .style('fill', '#9fddf9')
            .style('opacity', 0.45)
            .attr('pointer-events', 'none')
            .style('mix-blend-mode', 'color-dodge');
    }
    drawHand() {
        const path = "M95.1,194.6c6.2,0,11.3-5.1,11.3-11.3v-65.9c0-5,1.9-9.7,5.5-13.3l24.5-24c3.7-3.7,7.2-5.5,10.9-5.5c0,0,0,0,0,0c3.7,0,7.2,1.8,10.9,5.5l5.9,5.8l33.2-33.1l-40.1-40C149,4.5,138,0,126.3,0c0,0,0,0,0,0c-11.7,0-22.7,4.6-30.9,12.8c0,0-0.1,0.1-0.2,0.1L13.1,82.9C4.6,91.4,0,102.7,0,114.6v68.2c0,5.8,4.1,10.7,9.5,11.6c3.3,0.5,6.6-0.4,9.1-2.6c2.5-2.2,4-5.3,4-8.6v-61.6c0-1.4,1.2-2.6,2.6-2.6h0.1c1.4,0,2.6,1.2,2.6,2.6v61.6c0,6.2,5.1,11.3,11.3,11.3s11.3-5.1,11.3-11.3v-61.6c0-1.4,1.2-2.6,2.6-2.6h0.1c1.4,0,2.6,1.2,2.6,2.6v61.6c0,6.2,5.1,11.3,11.3,11.3s11.3-5.1,11.3-11.3v-61.6c0-1.4,1.2-2.6,2.6-2.6h0.1c1.4,0,2.6,1.2,2.6,2.6v61.6C83.8,189.5,88.9,194.6,95.1,194.6z";
        const handGroup = this.svg.append('g')
            .attr('transform', 'translate(' + [(this.offsetX + (this.width * 0.373)), (this.offsetY + (this.height * 0.562))] + '), scale(' + this.scale + ')');
        handGroup.append('path')
            .attr('d', path)
            .style('fill', '#ccc');
        const data = [{ x: 0 }, { x: 27.9 }, { x: (27.9 * 2) }, { x: (27.9 * 3) }];
        handGroup.selectAll('circle.nail')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'nail')
            .attr('r', 8.65)
            .attr('cx', (d) => d.x + 11.15)
            .attr('cy', 179)
            .style('fill', '#832990');
        handGroup.selectAll('rect.hand')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'hand')
            .attr('width', 17.3)
            .attr('height', 17.3)
            .attr('x', (d) => d.x + 2.5)
            .attr('y', 179)
            .style('fill', '#832990');
    }
}
DrawingService.ɵfac = function DrawingService_Factory(t) { return new (t || DrawingService)(); };
DrawingService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: DrawingService, factory: DrawingService.ɵfac });


/***/ }),

/***/ "2CWi":
/*!*************************************************************!*\
  !*** ./src/app/components/frontpage/frontpage.component.ts ***!
  \*************************************************************/
/*! exports provided: FrontpageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrontpageComponent", function() { return FrontpageComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_content_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/content.service */ "NBun");
/* harmony import */ var src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/multimodal.service */ "bTnw");
/* harmony import */ var src_app_services_drawing_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/drawing.service */ "1CK5");
/* harmony import */ var _multimodal_multimodal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../multimodal/multimodal.component */ "rE4P");
/* harmony import */ var ng_inline_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-inline-svg */ "e8Ap");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../footer/footer.component */ "LmEr");









const _c0 = function (a0) { return { haptic: a0 }; };
function FrontpageComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "video", 15, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "source", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "p", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const project_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c0, ctx_r0.config.modalities[0].active));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("muted", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", project_r1 == null ? null : project_r1.video, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](project_r1 == null ? null : project_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](project_r1 == null ? null : project_r1.description);
} }
const _c1 = function (a0) { return { darkMode: a0 }; };
const _c2 = function (a0, a1) { return { darkMode: a0, visual: a1 }; };
const _c3 = function (a0, a1) { return { darkMode: a0, haptic: a1 }; };
class FrontpageComponent {
    constructor(document, contentService, multimodalService, drawingService) {
        this.document = document;
        this.contentService = contentService;
        this.multimodalService = multimodalService;
        this.drawingService = drawingService;
        this.projects = [];
        this.config = this.multimodalService.config;
        this.config.activePage = 'welcome';
    }
    ngOnInit() {
        this.contentService.getSelectedProjects().subscribe(res => {
            this.data = res;
        });
        this.drawingService.mode = this.config.theme;
        this.drawingService.draw();
    }
    scrollDown() {
        this.document.getElementById('page-wrapper').scrollTop = window.innerHeight;
    }
    // @HostListener('window:scroll', ['$event'])
    // onWindowScroll(e: any) {
    //   if (this.config.scrollImageVisible && window.pageYOffset > 200) {
    //     this.config.scrollImageVisible = false;
    //     this.document.getElementById('scroll-msg').classList.add('hidden');
    //   }
    // }
    onMousemove(e) {
        if (this.config.modalities[1].active) {
            this.drawingService.moveEye(e.clientX, e.clientY);
        }
    }
    onTouchMove(e) {
        if (this.config.modalities[1].active) {
            this.drawingService.moveEye(e.touches[0].clientX, e.touches[0].clientY);
        }
    }
    onResize(event) {
        this.drawingService.draw(false);
    }
}
FrontpageComponent.ɵfac = function FrontpageComponent_Factory(t) { return new (t || FrontpageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_content_service__WEBPACK_IMPORTED_MODULE_2__["ContentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_3__["MultimodalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_drawing_service__WEBPACK_IMPORTED_MODULE_4__["DrawingService"])); };
FrontpageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FrontpageComponent, selectors: [["app-frontpage"]], hostBindings: function FrontpageComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousemove", function FrontpageComponent_mousemove_HostBindingHandler($event) { return ctx.onMousemove($event); })("touchmove", function FrontpageComponent_touchmove_HostBindingHandler($event) { return ctx.onTouchMove($event); })("resize", function FrontpageComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
    } }, decls: 19, vars: 24, consts: [["id", "page-wrapper", 1, "page-wrapper", 3, "ngClass"], [1, "page-section", "start", 3, "ngClass"], [1, "vertical-aligned-textblock"], [1, "basic-text-style-large"], [1, "site-explanation"], [1, "mobile-multimodal-menu-front-page", 3, "ngClass"], ["id", "svgBg"], ["id", "scroll-msg", 1, "scroll-down-image", "buttonEl", 3, "ngClass", "inlineSVG", "title", "click"], ["id", "selected-work", 1, "page-section", "selected-work", 3, "ngClass"], [1, "section-title"], [1, "section-title-text-style"], ["class", "selected-projects", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "selected-projects", 3, "ngClass"], [1, "video-preview", "column"], [1, "video-wrapper"], ["width", "100%", "height", "auto", "id", "video", "controls", "", 1, "video", 3, "muted"], ["video", ""], ["type", "video/mp4", 3, "src"], [1, "project-details", "column"], [1, "project-title"], [1, "project-details", "basic-text-style-large"]], template: function FrontpageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "app-multimodal");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FrontpageComponent_Template_div_click_12_listener() { return ctx.scrollDown(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "p", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Selected projects");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, FrontpageComponent_div_17_Template, 11, 7, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "app-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](12, _c0, ctx.config.modalities[0].active));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](14, _c1, ctx.config.theme === "dark-mode"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.data == null ? null : ctx.data.header);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.data == null ? null : ctx.data.intro_text);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.data == null ? null : ctx.data.explanation, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](16, _c1, ctx.config.theme === "dark-mode"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("title", ctx.data == null ? null : ctx.data.scrolldown_text);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](18, _c2, ctx.config.theme === "dark-mode", ctx.config.modalities[1].active))("inlineSVG", "/assets/images/scroll-down.svg");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-text", ctx.data == null ? null : ctx.data.scrolldown_text);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](21, _c3, ctx.config.theme === "dark-mode", ctx.config.modalities[0].active));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.data == null ? null : ctx.data.selected_work);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["NgClass"], _multimodal_multimodal_component__WEBPACK_IMPORTED_MODULE_5__["MultimodalComponent"], ng_inline_svg__WEBPACK_IMPORTED_MODULE_6__["InlineSVGDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__["FooterComponent"]], styles: [".page-wrapper.haptic[_ngcontent-%COMP%] {\n  scroll-snap-type: y mandatory;\n}\n\n.page-section.selected-work[_ngcontent-%COMP%] {\n  height: auto;\n  padding-bottom: 10vh;\n  margin-top: 0;\n  scroll-snap-align:start;\n}\n\n.page-section.start[_ngcontent-%COMP%] {\n  scroll-snap-align:start;\n}\n\n.scroll-down-image[_ngcontent-%COMP%] {\n  position: absolute;\n  display: inline-block;\n  left: 0;\n  margin-left: var(--content-margin);\n  width: 40px;\n  height: auto;\n  bottom: 7vh;\n  opacity: 1;\n  cursor: pointer;\n}\n\n.scroll-down-image.visual[_ngcontent-%COMP%] {\n  animation: scrollDownAnimation ease 1.5s;\n  animation-iteration-count: 10;\n  animation-delay: 0;\n}\n\n@keyframes scrollDownAnimation {\n  0% {\n    opacity: 1;\n    bottom: 7vh;\n  }\n  50% {\n    opacity: 1;\n    bottom: 5vh;\n  }\n  100% {\n    opacity: 1;\n    bottom: 7vh;\n  }\n}\n\n.scroll-down-image[_ngcontent-%COMP%]:after {\n  content: attr(data-text);\n  position: absolute;\n  left: 100%;\n  margin-left: 25px;\n  width: 180px;\n  white-space: wrap;\n  top: 50%;\n  transform: translateY(-60%);\n  font-family: var(--base-font-title);\n  font-size: 16px;\n}\n\n.scroll-down-image.hidden[_ngcontent-%COMP%] {\n  display:none;\n}\n\n.mobile-multimodal-menu-front-page[_ngcontent-%COMP%] {\n  display: none;\n  position: relative;\n  width: 100%;\n  margin: -30px 0 80px;\n}\n\n.selected-projects[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  padding: 0 var(--content-margin);\n  scroll-snap-align: start;\n}\n\n.column[_ngcontent-%COMP%] {\n  padding: 3vh 0 10vh;\n  flex: 1;\n}\n\n.project-details[_ngcontent-%COMP%] {\n  align-self: center;\n}\n\n.column.project-details[_ngcontent-%COMP%] {\n  padding-left: 3vw;\n}\n\n.section-title-text-style[_ngcontent-%COMP%], .project-title[_ngcontent-%COMP%] {\n  width: var(--window-width);\n  padding: 0 var(--content-margin);\n  box-sizing: border-box;\n  font-family: 'Poppins', sans-serif;\n  font-weight: 500;\n  font-size: 2.2vw;\n}\n\n.project-title[_ngcontent-%COMP%] {\n  font-size: 1.6vw;\n  margin: 0;\n  padding: 0;\n}\n\n@media screen and (max-width: 1400px) {\n  .scroll-down-image[_ngcontent-%COMP%] {\n    display:none;\n  }\n\n  .section-title-text-style[_ngcontent-%COMP%] {\n    font-size: 40px;\n  }\n\n  .project-title[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n  .page-wrapper.haptic[_ngcontent-%COMP%] {\n    \n    scroll-snap-type:none!important;\n  }\n}\n\n@media screen and (max-width: 1200px) {\n  .scroll-down-image[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n\n  .section-title-text-style[_ngcontent-%COMP%] {\n    font-size: 34px;\n  }\n\n\n  .selected-projects[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding: 0 var(--content-margin);\n  }\n\n  .column[_ngcontent-%COMP%] {\n    padding: 3vh 0 0 0;\n  }\n\n  .column.project-details[_ngcontent-%COMP%] {\n    padding-left: 0;\n  }\n\n}\n\n@media screen and (max-width: 700px) {\n  .mobile-multimodal-menu-front-page[_ngcontent-%COMP%] {\n    display: inline-block;\n  }\n\n\n\n  .section-title-text-style[_ngcontent-%COMP%] {\n    font-size: 28px;\n  }\n\n  .project-title[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyb250cGFnZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtFQUNFLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIsT0FBTztFQUNQLGtDQUFrQztFQUNsQyxXQUFXO0VBQ1gsWUFBWTtFQUNaLFdBQVc7RUFDWCxVQUFVO0VBQ1YsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHdDQUF3QztFQUN4Qyw2QkFBNkI7RUFDN0Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0U7SUFDRSxVQUFVO0lBQ1YsV0FBVztFQUNiO0VBQ0E7SUFDRSxVQUFVO0lBQ1YsV0FBVztFQUNiO0VBQ0E7SUFDRSxVQUFVO0lBQ1YsV0FBVztFQUNiO0FBQ0Y7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixpQkFBaUI7RUFDakIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixRQUFRO0VBQ1IsMkJBQTJCO0VBQzNCLG1DQUFtQztFQUNuQyxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsb0JBQW9CO0FBQ3RCOztBQUdBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixnQ0FBZ0M7RUFDaEMsd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLE9BQU87QUFDVDs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLDBCQUEwQjtFQUMxQixnQ0FBZ0M7RUFDaEMsc0JBQXNCO0VBQ3RCLGtDQUFrQztFQUNsQyxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFNBQVM7RUFDVCxVQUFVO0FBQ1o7O0FBRUE7RUFDRTtJQUNFLFlBQVk7RUFDZDs7RUFFQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIsK0JBQStCO0VBQ2pDO0FBQ0Y7O0FBR0E7RUFDRTtJQUNFLGFBQWE7RUFDZjs7O0VBR0E7SUFDRSxlQUFlO0VBQ2pCOzs7RUFHQTtJQUNFLHNCQUFzQjtJQUN0QixnQ0FBZ0M7RUFDbEM7O0VBRUE7SUFDRSxrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCOztBQUVGOztBQUVBO0VBQ0U7SUFDRSxxQkFBcUI7RUFDdkI7Ozs7RUFJQTtJQUNFLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCO0FBQ0YiLCJmaWxlIjoiZnJvbnRwYWdlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi5wYWdlLXdyYXBwZXIuaGFwdGljIHtcbiAgc2Nyb2xsLXNuYXAtdHlwZTogeSBtYW5kYXRvcnk7XG59XG5cbi5wYWdlLXNlY3Rpb24uc2VsZWN0ZWQtd29yayB7XG4gIGhlaWdodDogYXV0bztcbiAgcGFkZGluZy1ib3R0b206IDEwdmg7XG4gIG1hcmdpbi10b3A6IDA7XG4gIHNjcm9sbC1zbmFwLWFsaWduOnN0YXJ0O1xufVxuXG4ucGFnZS1zZWN0aW9uLnN0YXJ0IHtcbiAgc2Nyb2xsLXNuYXAtYWxpZ246c3RhcnQ7XG59XG5cbi5zY3JvbGwtZG93bi1pbWFnZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBsZWZ0OiAwO1xuICBtYXJnaW4tbGVmdDogdmFyKC0tY29udGVudC1tYXJnaW4pO1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiBhdXRvO1xuICBib3R0b206IDd2aDtcbiAgb3BhY2l0eTogMTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uc2Nyb2xsLWRvd24taW1hZ2UudmlzdWFsIHtcbiAgYW5pbWF0aW9uOiBzY3JvbGxEb3duQW5pbWF0aW9uIGVhc2UgMS41cztcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTA7XG4gIGFuaW1hdGlvbi1kZWxheTogMDtcbn1cblxuQGtleWZyYW1lcyBzY3JvbGxEb3duQW5pbWF0aW9uIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgYm90dG9tOiA3dmg7XG4gIH1cbiAgNTAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGJvdHRvbTogNXZoO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgYm90dG9tOiA3dmg7XG4gIH1cbn1cblxuLnNjcm9sbC1kb3duLWltYWdlOmFmdGVyIHtcbiAgY29udGVudDogYXR0cihkYXRhLXRleHQpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDEwMCU7XG4gIG1hcmdpbi1sZWZ0OiAyNXB4O1xuICB3aWR0aDogMTgwcHg7XG4gIHdoaXRlLXNwYWNlOiB3cmFwO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02MCUpO1xuICBmb250LWZhbWlseTogdmFyKC0tYmFzZS1mb250LXRpdGxlKTtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG4uc2Nyb2xsLWRvd24taW1hZ2UuaGlkZGVuIHtcbiAgZGlzcGxheTpub25lO1xufVxuXG4ubW9iaWxlLW11bHRpbW9kYWwtbWVudS1mcm9udC1wYWdlIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAtMzBweCAwIDgwcHg7XG59XG5cblxuLnNlbGVjdGVkLXByb2plY3RzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgcGFkZGluZzogMCB2YXIoLS1jb250ZW50LW1hcmdpbik7XG4gIHNjcm9sbC1zbmFwLWFsaWduOiBzdGFydDtcbn1cblxuLmNvbHVtbiB7XG4gIHBhZGRpbmc6IDN2aCAwIDEwdmg7XG4gIGZsZXg6IDE7XG59XG5cbi5wcm9qZWN0LWRldGFpbHMge1xuICBhbGlnbi1zZWxmOiBjZW50ZXI7XG59XG5cbi5jb2x1bW4ucHJvamVjdC1kZXRhaWxzIHtcbiAgcGFkZGluZy1sZWZ0OiAzdnc7XG59XG5cbi5zZWN0aW9uLXRpdGxlLXRleHQtc3R5bGUsIC5wcm9qZWN0LXRpdGxlIHtcbiAgd2lkdGg6IHZhcigtLXdpbmRvdy13aWR0aCk7XG4gIHBhZGRpbmc6IDAgdmFyKC0tY29udGVudC1tYXJnaW4pO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDIuMnZ3O1xufVxuXG4ucHJvamVjdC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMS42dnc7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTQwMHB4KSB7XG4gIC5zY3JvbGwtZG93bi1pbWFnZSB7XG4gICAgZGlzcGxheTpub25lO1xuICB9XG5cbiAgLnNlY3Rpb24tdGl0bGUtdGV4dC1zdHlsZSB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICB9XG5cbiAgLnByb2plY3QtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgfVxuICAucGFnZS13cmFwcGVyLmhhcHRpYyB7XG4gICAgLyogaGVpZ2h0OiBhdXRvOyAqL1xuICAgIHNjcm9sbC1zbmFwLXR5cGU6bm9uZSFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMjAwcHgpIHtcbiAgLnNjcm9sbC1kb3duLWltYWdlIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cblxuICAuc2VjdGlvbi10aXRsZS10ZXh0LXN0eWxlIHtcbiAgICBmb250LXNpemU6IDM0cHg7XG4gIH1cblxuXG4gIC5zZWxlY3RlZC1wcm9qZWN0cyB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBwYWRkaW5nOiAwIHZhcigtLWNvbnRlbnQtbWFyZ2luKTtcbiAgfVxuXG4gIC5jb2x1bW4ge1xuICAgIHBhZGRpbmc6IDN2aCAwIDAgMDtcbiAgfVxuXG4gIC5jb2x1bW4ucHJvamVjdC1kZXRhaWxzIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gIH1cblxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MDBweCkge1xuICAubW9iaWxlLW11bHRpbW9kYWwtbWVudS1mcm9udC1wYWdlIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cblxuXG5cbiAgLnNlY3Rpb24tdGl0bGUtdGV4dC1zdHlsZSB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICB9XG5cbiAgLnByb2plY3QtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxufVxuIl19 */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "BBdW":
/*!*******************************************************************!*\
  !*** ./src/app/components/publications/publications.component.ts ***!
  \*******************************************************************/
/*! exports provided: PublicationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublicationsComponent", function() { return PublicationsComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_content_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/content.service */ "NBun");
/* harmony import */ var src_app_services_cursor_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/cursor.service */ "z1sW");
/* harmony import */ var src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/multimodal.service */ "bTnw");
/* harmony import */ var src_app_services_voice_control_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/voice-control.service */ "vjam");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../footer/footer.component */ "LmEr");








const _c0 = function (a0) { return { hidden: a0 }; };
const _c1 = function (a0) { return { active: a0 }; };
function PublicationsComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_div_7_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7); const type_r5 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r6.sortByPublicationType(type_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const type_r5 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("id", "publication-type-", type_r5.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c0, ctx_r0.config.inputActive))("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](7, _c1, type_r5.active));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-text", type_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](type_r5.name);
} }
const _c2 = function (a0) { return { up: a0 }; };
function PublicationsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_div_17_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r8.changeSortDirection(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](1, _c2, ctx_r1.sortDirection === "up"));
} }
function PublicationsComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_div_21_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r10.changeSortDirection(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](1, _c2, ctx_r2.sortDirection === "up"));
} }
function PublicationsComponent_div_25_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_div_25_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r12.changeSortDirection(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](1, _c2, ctx_r3.sortDirection === "up"));
} }
function PublicationsComponent_li_27_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.publication_date, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.year, " ");
} }
function PublicationsComponent_li_27_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.publication_date, " ", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.year, " ");
} }
function PublicationsComponent_li_27_div_7_p_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, ", ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function PublicationsComponent_li_27_div_7_p_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " and");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
const _c3 = function (a0) { return { bold: a0 }; };
function PublicationsComponent_li_27_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, PublicationsComponent_li_27_div_7_p_1_Template, 2, 0, "p", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, PublicationsComponent_li_27_div_7_p_2_Template, 2, 0, "p", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const author_r31 = ctx.$implicit;
    const i_r32 = ctx.index;
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-index", i_r32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.authors.length) > 2 && i_r32 <= (publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.authors.length) - 1 && i_r32 > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.authors.length) > 1 && i_r32 === (publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.authors.length) - 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c3, author_r31 === "Eve Hoggan"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", author_r31, "");
} }
function PublicationsComponent_li_27_p_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](". ", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.conference, "");
} }
function PublicationsComponent_li_27_p_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](". ", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.book, "");
} }
function PublicationsComponent_li_27_p_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](". ", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.journal, "");
} }
function PublicationsComponent_li_27_p_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](". ", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.publisher, "");
} }
function PublicationsComponent_li_27_p_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](", volume ", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.volume, "");
} }
function PublicationsComponent_li_27_p_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](", issue ", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.issue, "");
} }
function PublicationsComponent_li_27_p_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](", ", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.pages, ".");
} }
function PublicationsComponent_li_27_p_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](publication_r14 == null ? null : publication_r14.type);
} }
function PublicationsComponent_li_27_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_li_27_div_17_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r46); const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r44.openPublication(publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.citations == null ? null : publication_r14.data.citations.link); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.citations == null ? null : publication_r14.data.citations.total);
} }
function PublicationsComponent_li_27_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_li_27_div_18_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r50); const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r48.openPublication(publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.citations == null ? null : publication_r14.data.citations.link); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Cited by ", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.citations == null ? null : publication_r14.data.citations.total, "");
} }
const _c4 = function (a0) { return { hovereffect: a0 }; };
function PublicationsComponent_li_27_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 43);
} if (rf & 2) {
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](1, _c4, ctx_r28.multimodalService.config.modalities[1].active));
} }
const _c5 = function (a0) { return { haptic: a0 }; };
const _c6 = function (a0) { return { buttonEl: a0 }; };
function PublicationsComponent_li_27_Template(rf, ctx) { if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mouseenter", function PublicationsComponent_li_27_Template_div_mouseenter_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r53); const publication_r14 = ctx.$implicit; const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r52.showImagePreview(publication_r14 == null ? null : publication_r14.image); })("mouseleave", function PublicationsComponent_li_27_Template_div_mouseleave_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r53); const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r54.hideImagePreview(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, PublicationsComponent_li_27_div_2_Template, 4, 2, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, PublicationsComponent_li_27_div_3_Template, 2, 2, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_li_27_Template_p_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r53); const publication_r14 = ctx.$implicit; const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r55.openPublication(publication_r14 == null ? null : publication_r14.pdf == null ? null : publication_r14.pdf.link); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, PublicationsComponent_li_27_div_7_Template, 5, 7, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, PublicationsComponent_li_27_p_8_Template, 2, 1, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, PublicationsComponent_li_27_p_9_Template, 2, 1, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, PublicationsComponent_li_27_p_10_Template, 2, 1, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, PublicationsComponent_li_27_p_11_Template, 2, 1, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, PublicationsComponent_li_27_p_12_Template, 2, 1, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, PublicationsComponent_li_27_p_13_Template, 2, 1, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, PublicationsComponent_li_27_p_14_Template, 2, 1, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, PublicationsComponent_li_27_p_16_Template, 2, 1, "p", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, PublicationsComponent_li_27_div_17_Template, 2, 1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, PublicationsComponent_li_27_div_18_Template, 2, 1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_li_27_Template_div_click_19_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r53); const publication_r14 = ctx.$implicit; const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r56.openPublication(publication_r14 == null ? null : publication_r14.pdf == null ? null : publication_r14.pdf.link); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, PublicationsComponent_li_27_div_20_Template, 1, 3, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const publication_r14 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](17, _c5, ctx_r4.config.modalities[0].active));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.width > 1400);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.width <= 1400);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](19, _c6, (publication_r14 == null ? null : publication_r14.pdf == null ? null : publication_r14.pdf.link) !== null));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](publication_r14 == null ? null : publication_r14.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.authors);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.conference);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.book);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.journal);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.publisher);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.volume);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.issue);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.pages);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", publication_r14 == null ? null : publication_r14.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.width > 1400);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.width <= 1400 && (publication_r14 == null ? null : publication_r14.data == null ? null : publication_r14.data.citations == null ? null : publication_r14.data.citations.total));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", publication_r14 == null ? null : publication_r14.pdf == null ? null : publication_r14.pdf.link);
} }
const _c7 = function (a0) { return { darkMode: a0 }; };
const _c8 = function (a0, a1) { return { visible: a0, darkMode: a1 }; };
const _c9 = function (a0) { return { close: a0 }; };
class PublicationsComponent {
    constructor(document, contentService, cursorService, multimodalService, voiceControlService) {
        this.document = document;
        this.contentService = contentService;
        this.cursorService = cursorService;
        this.multimodalService = multimodalService;
        this.voiceControlService = voiceControlService;
        this.publications = [];
        this.allPublications = [];
        this.searchInput = null;
        this.sortDirection = 'down';
        this.sortBy = 'citations';
        this.imageVisible = false;
        this.headerStuck = false;
        this.voiceSearch = false;
        this.months = [{ month: "Jan", index: 1 }, { month: "Feb", index: 2 }, { month: "Mar", index: 3 }, { month: "Apr", index: 4 }, { month: "May", index: 5 },
            { month: "June", index: 6 }, { month: "July", index: 7 }, { month: "Aug", index: 8 }, { month: "Sept", index: 9 }, { month: "Oct", index: 10 },
            { month: "Nov", index: 11 }, { month: "Dec", index: 12 }];
        this.publicationTypes = [
            { id: 0, name: "All", searchSlug: ["all"], active: true },
            { id: 1, name: "Conference Papers", searchSlug: ["conference paper"], active: false },
            { id: 2, name: "Book Chapters & Journal Articles", searchSlug: ["journal", "book chapter"], active: false },
            { id: 3, name: "Magazine Articles", searchSlug: ["magazine article"], active: false },
            { id: 4, name: "Workshops", searchSlug: ["workshop"], active: false },
            { id: 5, name: "Thesis", searchSlug: ["thesis"], active: false }
        ];
        this.config = this.multimodalService.config;
        this.width = window.innerWidth;
        this.multimodalService.config.activePage = 'publications';
        this.voiceControlService.selectPublications.subscribe(res => {
            let i = 0;
            for (const type of this.publicationTypes) {
                if (type.searchSlug.indexOf(res) > -1) {
                    // this.sortByPublicationType(type);
                    this.document.getElementById('publication-type-' + i).click();
                    break;
                }
                i++;
            }
        });
        this.voiceControlService.sortPublications.subscribe(res => {
            this.config.inputActive = false;
            this.config.inputFocus = false;
            this.document.getElementById('sort-' + res).click();
        });
        this.voiceControlService.searchInput.subscribe(res => {
            this.voiceSearch = true;
            this.config.inputActive = true;
            this.document.getElementById('search-input').style.opacity = "1";
            this.document.getElementById('search-input').value = res;
            this.searchPublications();
        });
        this.voiceControlService.closeSearch.subscribe(res => {
            this.document.getElementById('search-button').click();
        });
        this.voiceControlService.changeSortDirectionPublicationList.subscribe(res => {
            this.document.getElementById('sortButton').click();
        });
    }
    openPublication(url) {
        if (url) {
            this.multimodalService.playAudioClick();
            this.multimodalService.playHapticButtonClick(200);
            setTimeout(() => window.open(url, '_blank'), 500);
        }
    }
    toggleInputField() {
        this.config.inputActive = !this.config.inputActive;
        this.multimodalService.playAudioClick();
        this.multimodalService.playHapticButtonClick(200);
        if (this.config.inputActive && window.innerWidth > 1400) {
            this.document.getElementById('search-input').focus();
        }
        else if (!this.config.inputActive && window.innerWidth > 1400) {
            this.document.getElementById('publication-type-0').classList.add('active');
            this.document.getElementById('publication-type-0').click();
        }
        else {
            this.searchPublications();
        }
    }
    ngOnInit() {
        window.scrollTo(0, 0);
        let customPublicationList = [];
        this.contentService.getPublications().subscribe(res => {
            customPublicationList = res;
        });
        this.contentService.getScholarPublications().subscribe(res => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17;
            this.allPublications = res;
            for (const el of this.allPublications) {
                if (((_b = (_a = el.data) === null || _a === void 0 ? void 0 : _a.conference) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes('workshop')) || ((_d = (_c = el.data) === null || _c === void 0 ? void 0 : _c.book) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes('workshop')) || ((_f = (_e = el.data) === null || _e === void 0 ? void 0 : _e.journal) === null || _f === void 0 ? void 0 : _f.toLowerCase().includes('workshop'))) {
                    el.type = 'workshop';
                }
                else if (!((_g = el.data) === null || _g === void 0 ? void 0 : _g.volume) && (((_h = el.data) === null || _h === void 0 ? void 0 : _h.conference) || this.checkInput((_j = el.data) === null || _j === void 0 ? void 0 : _j.book, ['conference', 'symposium', 'proceedings', 'extended abstract']) || this.checkInput((_k = el.data) === null || _k === void 0 ? void 0 : _k.journal, ['conference', 'symposium', 'proceedings', 'extended abstract']))) {
                    el.type = 'conference paper';
                }
                else if (!this.checkInput((_l = el.data) === null || _l === void 0 ? void 0 : _l.journal, ['journal', 'book', 'computer', 'psychophysiology', 'ieee']) && ((_m = el.data) === null || _m === void 0 ? void 0 : _m.volume) && ((_o = el.data) === null || _o === void 0 ? void 0 : _o.issue)) {
                    el.type = 'magazine article';
                }
                else if ((this.checkInput((_p = el.data) === null || _p === void 0 ? void 0 : _p.book, ['book']) || this.checkInput((_q = el.data) === null || _q === void 0 ? void 0 : _q.journal, ['book'])) && ((_r = el.data) === null || _r === void 0 ? void 0 : _r.pages) && !((_s = el.data) === null || _s === void 0 ? void 0 : _s.volume)) {
                    el.type = 'book chapter';
                }
                else if ((((_t = el.data) === null || _t === void 0 ? void 0 : _t.publisher) || ((_u = el.data) === null || _u === void 0 ? void 0 : _u.journal)) && ((_v = el.data) === null || _v === void 0 ? void 0 : _v.pages)) {
                    el.type = 'journal';
                }
            }
            for (const el of customPublicationList) {
                const publication = this.allPublications.filter(p => { var _a, _b; return p.title.toLowerCase() === el.title.toLowerCase() && ((_a = p.data) === null || _a === void 0 ? void 0 : _a.year.toString()) === ((_b = el.data) === null || _b === void 0 ? void 0 : _b.year.toString()); })[0];
                if (publication) {
                    if (el.type) {
                        publication.type = el.type;
                    }
                    if ((_w = el.data) === null || _w === void 0 ? void 0 : _w.authors) {
                        publication.data.authors = (_x = el.data) === null || _x === void 0 ? void 0 : _x.authors;
                    }
                    if ((_y = el.data) === null || _y === void 0 ? void 0 : _y.conference) {
                        publication.data.conference = (_z = el.data) === null || _z === void 0 ? void 0 : _z.conference;
                    }
                    if ((_0 = el.data) === null || _0 === void 0 ? void 0 : _0.journal) {
                        publication.data.journal = (_1 = el.data) === null || _1 === void 0 ? void 0 : _1.journal;
                    }
                    if ((_2 = el.data) === null || _2 === void 0 ? void 0 : _2.book) {
                        publication.data.book = (_3 = el.data) === null || _3 === void 0 ? void 0 : _3.book;
                    }
                    if ((_4 = el.data) === null || _4 === void 0 ? void 0 : _4.volume) {
                        publication.data.volume = (_5 = el.data) === null || _5 === void 0 ? void 0 : _5.volume;
                    }
                    if ((_6 = el.data) === null || _6 === void 0 ? void 0 : _6.issue) {
                        publication.data.issue = (_7 = el.data) === null || _7 === void 0 ? void 0 : _7.issue;
                    }
                    if ((_8 = el.data) === null || _8 === void 0 ? void 0 : _8.publication_date) {
                        publication.data.publication_date = (_9 = el.data) === null || _9 === void 0 ? void 0 : _9.publication_date;
                    }
                    if ((_11 = (_10 = el.data) === null || _10 === void 0 ? void 0 : _10.pdf) === null || _11 === void 0 ? void 0 : _11.host) {
                        publication.pdf.host = (_13 = (_12 = el.data) === null || _12 === void 0 ? void 0 : _12.pdf) === null || _13 === void 0 ? void 0 : _13.host;
                    }
                    if ((_15 = (_14 = el.data) === null || _14 === void 0 ? void 0 : _14.pdf) === null || _15 === void 0 ? void 0 : _15.link) {
                        publication.pdf.link = (_17 = (_16 = el.data) === null || _16 === void 0 ? void 0 : _16.pdf) === null || _17 === void 0 ? void 0 : _17.link;
                    }
                    if (el.image) {
                        publication.image = el.image;
                    }
                }
                else {
                    this.allPublications.push(el);
                }
            }
            this.publications = this.allPublications;
            this.orderByColumn('citations', true);
        });
    }
    checkInput(input, words) {
        if (input) {
            return words.some(word => input.toLowerCase().includes(word.toLowerCase()));
        }
        return false;
    }
    onMouseMove(e) {
        if (this.config.modalities[1].active && this.imageVisible) {
            this.cursorService.moveImage(e.pageX, e.pageY - window.pageYOffset);
        }
    }
    onResize(event) {
        this.width = window.innerWidth;
    }
    showImagePreview(url) {
        if (this.config.modalities[1].active && url) {
            this.document.getElementById('image-cursor').style.backgroundImage = 'url(/assets/images/publication-images/' + url + ')';
            this.document.getElementById('image-cursor').style.opacity = '0.8';
            this.imageVisible = true;
        }
    }
    hideImagePreview() {
        this.document.getElementById('image-cursor').style.backgroundImage = 'none';
        this.document.getElementById('image-cursor').style.opacity = '0';
        this.imageVisible = false;
    }
    showSearchInput() {
        this.multimodalService.playAudioClick();
        this.multimodalService.playHapticButtonClick(200);
        this.document.getElementById('search-input').classList.add('visible');
    }
    focusInput() {
        this.config.inputFocus = true;
        this.multimodalService.playAudioClick();
        this.multimodalService.playHapticButtonClick(100);
    }
    sortByPublicationType(type, feedback = true) {
        if (feedback) {
            this.multimodalService.playAudioSlideClick();
            this.multimodalService.playHapticButtonClick([100, 70, 100]);
        }
        for (const el of this.publicationTypes) {
            if (el.name === type.name) {
                el.active = true;
            }
            else {
                el.active = false;
            }
        }
        if (type.name.toLowerCase() === 'all') {
            this.publications = this.allPublications;
        }
        else {
            this.publications = [];
            for (const publication of this.allPublications) {
                if (type.searchSlug.filter(s => s === publication.type).length > 0) {
                    this.publications.push(publication);
                }
            }
        }
    }
    changeCursorBlendMode(hover) {
        if (hover) {
            this.document.getElementById('cursor').classList.add('normal');
        }
        else {
            this.document.getElementById('cursor').classList.remove('normal');
        }
    }
    orderByColumn(type, first = false) {
        if (!first && this.sortBy === type) {
            this.changeSortDirection();
        }
        else {
            if (!first) {
                this.multimodalService.playAudioSlideClick();
                this.multimodalService.playHapticButtonClick(100);
            }
            this.sortBy = type;
            if (this.sortBy === 'title') {
                this.publications.sort((a, b) => {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                });
            }
            else if (this.sortBy === 'date') {
                this.publications.sort((a, b) => {
                    if (a.publication_date && b.publication_date) {
                        const month_a = a.publication_date.split(' ');
                        const month_b = b.publication_date.split(' ');
                        const a_index = this.months.filter(m => m.month === month_a[0])[0].index;
                        const b_index = this.months.filter(m => m.month === month_b[0])[0].index;
                        if (a_index && b_index) {
                            if (a_index < b_index) {
                                return this.sortDirection === 'up' ? -1 : 1;
                            }
                            if (a_index < b_index) {
                                return this.sortDirection === 'up' ? 1 : -1;
                            }
                        }
                    }
                    return 0;
                });
                this.publications.sort((a, b) => {
                    if (a.publication_date && b.publication_date) {
                        const day_a = a.publication_date.split(' ');
                        const day_b = b.publication_date.split(' ');
                        if (day_a.length > 1 && day_b.length > 1) {
                            if (day_a[1] < day_b[1]) {
                                return this.sortDirection === 'up' ? -1 : 1;
                            }
                            if (day_a[0] < day_b[0]) {
                                return this.sortDirection === 'up' ? 1 : -1;
                            }
                        }
                    }
                    return 0;
                });
                this.publications.sort((a, b) => {
                    if (a.data.year < b.data.year) {
                        return this.sortDirection === 'up' ? -1 : 1;
                    }
                    if (a.data.year > b.data.year) {
                        return this.sortDirection === 'up' ? 1 : -1;
                    }
                    return 0;
                });
            }
            else if (this.sortBy === 'citations') {
                this.publications.sort((a, b) => {
                    var _a, _b;
                    if (((_a = a.data.citations) === null || _a === void 0 ? void 0 : _a.total) && ((_b = b.data.citations) === null || _b === void 0 ? void 0 : _b.total)) {
                        if (parseInt(a.data.citations.total) < parseInt(b.data.citations.total)) {
                            return this.sortDirection === 'up' ? -1 : 1;
                        }
                        if (parseInt(a.data.citations.total) > parseInt(b.data.citations.total)) {
                            return this.sortDirection === 'up' ? 1 : -1;
                        }
                    }
                    return 0;
                });
            }
        }
    }
    changeSortDirection() {
        this.multimodalService.playAudioSlideClick();
        this.multimodalService.playHapticButtonClick(100);
        this.sortDirection = this.sortDirection === 'down' ? 'up' : 'down';
        this.publications.reverse();
    }
    searchPublications() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        this.searchInput = this.document.getElementById('search-input').value;
        const searchArray = this.searchInput.split(' ');
        this.publications = [];
        for (const item of searchArray) {
            if (item && this.voiceControlService.commonSearchWords.indexOf(item.toLowerCase()) > -1) {
                for (const publication of this.allPublications) {
                    let added = false;
                    if ((publication === null || publication === void 0 ? void 0 : publication.title.toLowerCase().includes(item.toLowerCase())) || ((_b = (_a = publication === null || publication === void 0 ? void 0 : publication.data) === null || _a === void 0 ? void 0 : _a.year) === null || _b === void 0 ? void 0 : _b.toString().includes(item.toLowerCase())) || ((_d = (_c = publication === null || publication === void 0 ? void 0 : publication.data) === null || _c === void 0 ? void 0 : _c.description) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(item.toLowerCase()))) {
                        added = true;
                        this.addPublication(publication);
                    }
                    if (!added && ((_f = (_e = publication === null || publication === void 0 ? void 0 : publication.data) === null || _e === void 0 ? void 0 : _e.authors) === null || _f === void 0 ? void 0 : _f.length) > 0) {
                        for (const author of (_g = publication === null || publication === void 0 ? void 0 : publication.data) === null || _g === void 0 ? void 0 : _g.authors) {
                            if (author === null || author === void 0 ? void 0 : author.toLowerCase().includes(item.toLowerCase())) {
                                added = true;
                                this.addPublication(publication);
                                break;
                            }
                        }
                    }
                    if (!added && ((_h = publication.data) === null || _h === void 0 ? void 0 : _h.conference)) {
                        if ((_k = (_j = publication === null || publication === void 0 ? void 0 : publication.data) === null || _j === void 0 ? void 0 : _j.conference) === null || _k === void 0 ? void 0 : _k.toLowerCase().includes(item.toLowerCase())) {
                            added = true;
                            this.addPublication(publication);
                        }
                    }
                    if (!added && ((_l = publication.data) === null || _l === void 0 ? void 0 : _l.book)) {
                        if ((_o = (_m = publication === null || publication === void 0 ? void 0 : publication.data) === null || _m === void 0 ? void 0 : _m.book) === null || _o === void 0 ? void 0 : _o.toLowerCase().includes(item.toLowerCase())) {
                            added = true;
                            this.addPublication(publication);
                        }
                    }
                    if (!added && ((_p = publication.data) === null || _p === void 0 ? void 0 : _p.publisher)) {
                        if ((_r = (_q = publication === null || publication === void 0 ? void 0 : publication.data) === null || _q === void 0 ? void 0 : _q.publisher) === null || _r === void 0 ? void 0 : _r.toLowerCase().includes(item.toLowerCase())) {
                            added = true;
                            this.addPublication(publication);
                        }
                    }
                    if (!added && ((_s = publication.data) === null || _s === void 0 ? void 0 : _s.journal)) {
                        if ((_t = publication === null || publication === void 0 ? void 0 : publication.data) === null || _t === void 0 ? void 0 : _t.journal.toLowerCase().includes(item.toLowerCase())) {
                            added = true;
                            this.addPublication(publication);
                        }
                    }
                    if (!added && publication.type) {
                        if (publication === null || publication === void 0 ? void 0 : publication.type.toLowerCase().includes(item.toLowerCase())) {
                            added = true;
                            this.addPublication(publication);
                        }
                    }
                }
            }
        }
        if (this.voiceSearch) {
            this.voiceSearch = false;
            let reply = "I have found " + this.publications.length + " items that match your search.";
            if (this.publications.length === 1) {
                reply = "I have found one item that matches your search.";
            }
            else if (this.publications.length === 0) {
                reply = "Sorry, I didn't find any items.";
            }
            this.voiceControlService.respond(reply);
        }
        this.hideImagePreview();
    }
    addPublication(publication) {
        if (this.publications.filter(p => p.title === (publication === null || publication === void 0 ? void 0 : publication.title)).length === 0) {
            this.publications.push(publication);
        }
    }
}
PublicationsComponent.ɵfac = function PublicationsComponent_Factory(t) { return new (t || PublicationsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_content_service__WEBPACK_IMPORTED_MODULE_2__["ContentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_cursor_service__WEBPACK_IMPORTED_MODULE_3__["CursorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_4__["MultimodalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_voice_control_service__WEBPACK_IMPORTED_MODULE_5__["VoiceControlService"])); };
PublicationsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: PublicationsComponent, selectors: [["app-publications"]], hostBindings: function PublicationsComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousemove", function PublicationsComponent_mousemove_HostBindingHandler($event) { return ctx.onMouseMove($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveDocument"])("resize", function PublicationsComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
    } }, decls: 31, vars: 29, consts: [[1, "page-wrapper", 3, "ngClass"], [1, "publication-list", 3, "ngClass"], [1, "section-header", 3, "ngClass"], [1, "section-title"], [1, "search-controls", 3, "ngClass"], [1, "publication-types-container"], ["class", "publication-types buttonEl", 3, "ngClass", "id", "click", 4, "ngFor", "ngForOf"], ["type", "text", "name", "search", "id", "search-input", "placeholder", "search", "spellcheck", "false", 3, "ngClass", "focus", "focusout", "change"], [1, "search-box"], ["id", "search-button", 1, "search-button", "buttonEl", 3, "ngClass", "click"], ["id", "search-icon", "src", "../../../assets/images/search-icon.svg", "alt", "search button"], ["id", "close-search", 1, "close-search"], ["id", "sticky-header", 1, "sticky-header", 3, "ngClass", "mouseenter", "mouseleave"], [1, "header-year", "column-title"], ["id", "sort-date", 1, "column-name", "buttonEl", 3, "click"], ["class", "arrow buttonEl", "id", "sortButton", 3, "ngClass", "click", 4, "ngIf"], [1, "header-details", "column-title"], ["id", "sort-title", 1, "column-name", "buttonEl", 3, "click"], [1, "header-citations", "column-title"], ["id", "sort-citations", 1, "column-name", "buttonEl", 3, "click"], ["class", "publication-item-container", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "searchResults"], [1, "publication-types", "buttonEl", 3, "ngClass", "id", "click"], ["id", "sortButton", 1, "arrow", "buttonEl", 3, "ngClass", "click"], [1, "publication-item-container", 3, "ngClass"], [1, "publication-item", 3, "mouseenter", "mouseleave"], ["class", "publication-year row-item", 4, "ngIf"], [1, "publication-details", "row-item"], [1, "body-title", 3, "ngClass", "click"], ["class", "div-container-element", 4, "ngFor", "ngForOf"], ["class", "publication-book", 4, "ngIf"], ["class", "publication-type", 4, "ngIf"], ["class", "publication-citations row-item buttonEl", 3, "click", 4, "ngIf"], [1, "publication-link", "row-item", 3, "click"], ["class", "arrow-link", 3, "ngClass", 4, "ngIf"], [1, "publication-year", "row-item"], [1, "div-container-element"], ["class", "body-text", 4, "ngIf"], [1, "body-text", 3, "ngClass"], [1, "body-text"], [1, "publication-book"], [1, "publication-type"], [1, "publication-citations", "row-item", "buttonEl", 3, "click"], [1, "arrow-link", 3, "ngClass"]], template: function PublicationsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Publications");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, PublicationsComponent_div_7_Template, 2, 9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("focus", function PublicationsComponent_Template_input_focus_8_listener() { return ctx.focusInput(); })("focusout", function PublicationsComponent_Template_input_focusout_8_listener() { return ctx.config.inputFocus = false; })("change", function PublicationsComponent_Template_input_change_8_listener() { return ctx.searchPublications(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_Template_div_click_10_listener() { return ctx.toggleInputField(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mouseenter", function PublicationsComponent_Template_div_mouseenter_13_listener() { return ctx.changeCursorBlendMode(true); })("mouseleave", function PublicationsComponent_Template_div_mouseleave_13_listener() { return ctx.changeCursorBlendMode(false); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_Template_div_click_15_listener() { return ctx.orderByColumn("date"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, PublicationsComponent_div_17_Template, 1, 3, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_Template_div_click_19_listener() { return ctx.orderByColumn("title"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "publication");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, PublicationsComponent_div_21_Template, 1, 3, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PublicationsComponent_Template_div_click_23_listener() { return ctx.orderByColumn("citations"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "citations");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, PublicationsComponent_div_25_Template, 1, 3, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, PublicationsComponent_li_27_Template, 21, 21, "li", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](30, "app-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](14, _c5, ctx.config.modalities[0].active));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](16, _c7, ctx.config.theme === "dark-mode"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](18, _c5, ctx.config.modalities[0].active));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](20, _c5, ctx.config.modalities[0].active));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.publicationTypes);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](22, _c8, ctx.config.inputActive, ctx.config.theme === "dark-mode"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](25, _c9, ctx.config.inputActive));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](27, _c7, ctx.config.theme === "dark-mode"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.sortBy === "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.sortBy === "title");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.sortBy === "citations");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.publications);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" Items: ", ctx.publications.length, " of ", ctx.allPublications.length, " ");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_6__["FooterComponent"]], styles: ["img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n}\n\n\n\n.section-header[_ngcontent-%COMP%] {\n  margin-top: var(--top-margin-menu);\n  padding-top: var(--window-margin-top);\n}\n\n.section-header.haptic[_ngcontent-%COMP%] {\n  scroll-snap-align:start;\n}\n\n.search-controls[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 80px;\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 20px;\n  scroll-snap-align: start;\n  \n}\n\n.search-controls.haptic[_ngcontent-%COMP%] {\n  scroll-snap-align: start;\n}\n\n.publication-types-container[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-direction: row;\n  align-self: baseline;\n  flex-wrap: wrap;\n}\n\n.body-title[_ngcontent-%COMP%] {\n  text-transform: capitalize;\n}\n\n.publication-types[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  font-family: var(--base-font-title);\n  margin-right: 1.4vw;\n  margin-bottom: 0.8vw;\n  padding: 2px 10px;\n  font-size: 1vw;\n  font-weight: 400;\n  text-transform: uppercase;\n  cursor:pointer;\n  white-space: nowrap;\n  -webkit-user-select: none;\n          user-select: none;\n}\n\n.publication-types.hidden[_ngcontent-%COMP%] {\n  display:none;\n}\n\n.publication-types[_ngcontent-%COMP%]:after {\n  content: attr(data-text);\n  position: absolute;\n  display: none;\n  width: 0;\n  top:0;\n  left:0;\n  padding: 2px 10px;\n  border-radius: 30px;\n  background: var(--color);\n  color: #eee;\n  z-index: 1;\n  overflow: hidden;\n\n  -webkit-animation: moveBackground ease 0.3s;\n  -webkit-animation-iteration-count: 1;\n  -webkit-animation-play-state: paused;\n\n  -moz-animation: moveBackground ease 0.3s;\n  -moz-animation-iteration-count: 1;\n  -moz-animation-play-state: paused;\n\n  -ms-animation: moveBackground ease 0.3s;\n  -ms-animation-iteration-count: 1;\n  -ms-animation-play-state: paused;\n\n  -o-animation: moveBackground ease 0.3s;\n  -o-animation-iteration-count: 1;\n  -o-animation-play-state: paused;\n\n  animation: moveBackground ease 0.3s;\n  animation-iteration-count: 1;\n  animation-play-state: paused;\n}\n\n.publication-types.active[_ngcontent-%COMP%]:after {\n  display: inline-block;\n  width: calc(100% - 20px);\n  animation-play-state: running;\n}\n\n@keyframes moveBackground {\n  0% {\n    width: 0%;\n  }\n  100% {\n    width: calc(100% - 20px);\n  }\n}\n\n.search-box[_ngcontent-%COMP%] {\n  width: auto;\n  position: relative;\n  align-self: bottom;\n  margin-top: -13px;\n  margin-right: 20px;\n  display: inline-flex;\n  flex-direction: column;\n  z-index: 98;\n}\n\n.publication-list[_ngcontent-%COMP%] {\n  width: var(--window-width);\n  height: auto;\n  margin-left: var(--window-margin);\n  padding: 70px var(--content-margin) var(--window-margin-top);\n  box-sizing: border-box;\n  z-index: 0;\n}\n\n.publication-list.darkMode[_ngcontent-%COMP%] {\n  background: var(--base-color2);\n}\n\n.search-button[_ngcontent-%COMP%] {\n  position: relative;\n  width: 39px;\n  height: 39px;\n  padding: 8px;\n  background: var(--color);\n  border-radius: 39px;\n  margin-left: calc(100% - 60px);\n  margin-top: -123px;\n  cursor: pointer;\n}\n\n.close-search[_ngcontent-%COMP%] {\n  position: absolute;\n  display: none;\n  background: #fff;\n  width: 34px;\n  left:50%;\n  top:50%;\n  height:4px;\n  border-radius: 4px;\n  transform: translate(-50%, -50%) rotate(45deg);\n}\n\n.close-search[_ngcontent-%COMP%]:after {\n  content: \"\";\n  position: absolute;\n  background: #fff;\n  width: 34px;\n  border-radius: 4px;\n  height:4px;\n  left:50%;\n  top:50%;\n  transform: translate(-50%, -50%) rotate(-90deg);\n}\n\n.search-button.close[_ngcontent-%COMP%] {\n  margin-top:-70px;\n}\n\n.search-button.close[_ngcontent-%COMP%]   .close-search[_ngcontent-%COMP%] {\n  display: inline-flex;\n}\n\n.search-button.close[_ngcontent-%COMP%]   #search-icon[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.sticky-header[_ngcontent-%COMP%] { \n  position: sticky;\n  top: 0;\n  display:flex;\n  flex-direction: row;\n  justify-content: space-between;\n  height: 28px;\n  line-height: 27px;\n  color: var(--color);\n  text-transform: uppercase;\n  font-family: var(--base-font-title);\n  font-size: 16px;\n  \n  font-weight: 500;\n  background: #FFF;\n  border-bottom: 1px solid var(--color)!important;\n  z-index: 99;\n}\n\n.sticky-header.darkMode[_ngcontent-%COMP%] {\n  background: var(--base-color2);\n}\n\n\n\n.column-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  cursor: pointer;\n}\n\n.sticky-header[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%] {\n  position: relative;\n  left: 12px;\n  margin-top: 8px;\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-bottom: 2px solid var(--color);\n  border-right: 2px solid var(--color);\n  transform: rotate(45deg);\n}\n\n.sticky-header[_ngcontent-%COMP%]   .arrow.up[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  transform: rotate(-135deg);\n}\n\n.sticky-header.stuck[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%] {\n  border-bottom: 2px solid #fff;\n  border-right: 2px solid #fff;\n}\n\n.publication-item-container.haptic[_ngcontent-%COMP%] {\n  scroll-snap-align:start;\n  \n}\n\n.publication-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  align-items: stretch;\n  font-family: var(--base-font-body);\n  width: 100%;\n  padding: 60px 0;\n  box-sizing: border-box;\n  border-bottom: 1px solid rgba(170,170,170,0.3);\n  z-index: 95;\n}\n\n.publication-item-container[_ngcontent-%COMP%]:last-child   .publication-item[_ngcontent-%COMP%] {\n  border-bottom:none;\n  -webkit-animation: fadeIn ease 1.5s;\n  -webkit-animation-iteration-count: 1;\n  -webkit-animation-fill-mode: forwards;\n\n  -moz-animation: fadeIn ease 1.5s;\n  -moz-animation-iteration-count: 1;\n  -moz-animation-fill-mode: forwards;\n\n  -ms-animation: fadeIn ease 1.5s;\n  -ms-animation-iteration-count: 1;\n  -ms-animation-fill-mode: forwards;\n\n  -o-animation: fadeIn ease 1.5s;\n  -o-animation-iteration-count: 1;\n  -o-animation-fill-mode: forwards;\n\n  animation: fadeIn ease 1.5s;\n  animation-iteration-count: 1;\n  animation-fill-mode: forwards;\n}\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n    margin-top: 60px;\n  }\n  100% {\n    opacity: 1;\n    margin-top: 0;\n  }\n}\n\n.publication-year[_ngcontent-%COMP%] {\n  color: var(--color);\n  width: 100px;\n  margin-right: 20px;\n  font-size: 24px;\n  line-height: 34px;\n  font-weight: 500;\n  -webkit-user-select: none;\n          user-select: none;\n}\n\n.header-year[_ngcontent-%COMP%] {\n  width: 100px;\n  margin-right: 20px;\n}\n\n.header-details[_ngcontent-%COMP%] {\n  width: calc(100% - 400px);\n  margin-right: 20px;\n}\n\n.header-citations[_ngcontent-%COMP%] {\n  width: 195px;\n}\n\n.searchResults[_ngcontent-%COMP%] {\n  position: relative;\n  color: #999;\n  font-family: var(--base-font-title);\n  font-size: 18px;\n  width: 100%;\n  text-align: center;\n  margin-top: 50px;\n  \n}\n\n.publication-details[_ngcontent-%COMP%], .header-details[_ngcontent-%COMP%] {\n  width: calc(100% - 400px);\n  margin-right: 20px;\n}\n\n.publication-citations[_ngcontent-%COMP%] {\n  width: 100px;\n  font-family: var(--base-font-title);\n  font-size: 16px;\n}\n\n.body-text.bold[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n\n.publication-link[_ngcontent-%COMP%] {\n  position: relative;\n  cursor:pointer;\n  width: 60px;\n  height: 30px;\n}\n\n.row-item[_ngcontent-%COMP%] {\n  align-self: center;\n}\n\ninput[type=\"text\"][_ngcontent-%COMP%] {\n  position: relative;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  left:100%;\n  top:0;\n  margin-top: -40px;\n  border:none;\n  padding: 0;\n  height: 110px;\n  box-sizing: border-box;\n  width: 0;\n  color: var(--color);\n  background: #f5f5f5;\n  caret-color: var(--color);\n  font-family: 'Poppins', sans-serif;\n  font-size: 2vw;\n  z-index: -1;\n}\n\ninput[type=\"text\"][_ngcontent-%COMP%]:focus {\n  border: none;\n  outline: none;\n}\n\ninput[type=\"text\"].visible[_ngcontent-%COMP%] {\n  z-index: 50;\n  width: 100%;\n  left:0;\n  padding: 10px 30px;\n  transition: all 0.8s;\n}\n\ninput[type=\"text\"].darkMode[_ngcontent-%COMP%] {\n  background: #333;\n  color: var(--color3);\n}\n\n[_ngcontent-%COMP%]::placeholder { \n  color: var(--color3);\n  opacity: 1; \n}\n\n[_ngcontent-%COMP%]:-ms-input-placeholder { \n  color: var(--color3);\n}\n\n[_ngcontent-%COMP%]::-ms-input-placeholder { \n  color: var(--color3);\n}\n\n.arrow-link[_ngcontent-%COMP%] {\n  display:inline-block;\n  position: absolute;\n  left: 0;\n  top: 50%;\n  margin-left: 0;\n  width: 20px;\n  height: 0;\n  border-top: 2px solid #999;\n  transition: all 0.2s ease-in-out;\n  opacity: 0.3;\n  padding: 0 10px;\n}\n\n.arrow-link[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  transform: translate(0, -62%) rotate(45deg);\n  border-right: 2px solid #999;\n  border-top: 2px solid #999;\n  right: 0;\n}\n\n.publication-item[_ngcontent-%COMP%]:hover   .arrow-link.hovereffect[_ngcontent-%COMP%] {\n  opacity: 1;\n  margin-left: 10px;\n}\n\n@media screen and (max-width: 1600px) {\n  .publication-types[_ngcontent-%COMP%] {\n    font-size: 18px;\n    margin: 3px 4px;\n  }\n\n  .search-controls[_ngcontent-%COMP%] {\n    margin-bottom: 40px;\n  }\n\n  .search-box[_ngcontent-%COMP%] {\n    width: auto;\n    position: relative;\n  }\n\n  input[type=\"text\"][_ngcontent-%COMP%] {\n    left:0;\n    width: 100%;\n    top:20px;\n    border:none;\n    padding: 20px 80px 20px 30px;\n    margin: 5px 0 20px;\n    height: auto;\n    box-sizing: border-box;\n    opacity: 1;\n    color: var(--color);\n    background: #f5f5f5;\n    font-size: 22px;\n    z-index: 0;\n  }\n\n  input[type=\"text\"].visible[_ngcontent-%COMP%] {\n    transition: none;\n    padding: 20px 80px 20px 30px;\n  }\n\n  .search-button[_ngcontent-%COMP%], .search-button.close[_ngcontent-%COMP%] {\n    margin-left: calc(100% - 50px);\n    margin-top: -51px;\n  }\n\n  .search-button.close[_ngcontent-%COMP%]   .close-search[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .search-button.close[_ngcontent-%COMP%]   #search-icon[_ngcontent-%COMP%], .publication-types.hidden[_ngcontent-%COMP%] {\n    display: inline-block;\n  }\n}\n\n@media screen and (max-width: 1400px) {\n  .search-controls[_ngcontent-%COMP%] {\n    margin-top: 80px;\n    flex-direction: column;\n  }\n\n  .publication-types-container[_ngcontent-%COMP%] {\n    margin-top: 40px;\n  }\n\n  \n\n  .publication-wrapper.haptic[_ngcontent-%COMP%] {\n    scroll-snap-type: y proximity;\n  }\n\n  \n\n  .publication-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding: 40px 0;\n  }\n  .publication-year[_ngcontent-%COMP%], .publication-details[_ngcontent-%COMP%], .publication-citations[_ngcontent-%COMP%] {\n    width: 100%;\n    margin: 0;\n  }\n\n  .publication-year[_ngcontent-%COMP%] {\n    font-size: 20px;\n    line-height: 30px;\n  }\n  .sticky-header[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .publication-citations[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n\n  .publication-link[_ngcontent-%COMP%] {\n    margin-top:20px;\n  }\n}\n\n@media  screen and (max-width: 1200px) {\n  .publication-year[_ngcontent-%COMP%] {\n    font-size: 18px;\n    line-height: 28px;\n  }\n\n  .publication-citations[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\n\n@media screen and (max-width: 1000px) {\n  .arrow-link[_ngcontent-%COMP%]:after {\n    top: 0;\n  }\n\n  .publication-types[_ngcontent-%COMP%] {\n    font-size: 16px;\n    white-space: normal;\n  }\n\n  .publication-types[_ngcontent-%COMP%]:after {\n    animation: none;\n\n  }\n\n  input[type=\"text\"][_ngcontent-%COMP%] {\n    height: 70px;\n    font-size: 18px;\n    padding: 6px 60px 6px 20px\n  }\n\n  .search-button[_ngcontent-%COMP%], .search-button.close[_ngcontent-%COMP%] {\n    width: 30px;\n    height: 30px;\n    padding: 6px;\n    border-radius: 30px;\n    margin-left: calc(100% - 35px);\n    margin-top: -43px;\n  }\n}\n\n@media screen and (max-width: 800px) {\n  .search-controls[_ngcontent-%COMP%] {\n    margin-top: 20px;\n  }\n\n  .publication-types[_ngcontent-%COMP%] {\n    left: -10px;\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpY2F0aW9ucy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTs7R0FFRzs7QUFFSDtFQUNFLGtDQUFrQztFQUNsQyxxQ0FBcUM7QUFDdkM7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBR0E7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHdCQUF3QjtFQUN4QixvQ0FBb0M7QUFDdEM7O0FBQ0E7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQixlQUFlO0FBQ2pCOztBQUdBO0VBQ0UsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixtQ0FBbUM7RUFDbkMsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLGdCQUFnQjtFQUNoQix5QkFBeUI7RUFDekIsY0FBYztFQUNkLG1CQUFtQjtFQUNuQix5QkFBaUI7VUFBakIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsUUFBUTtFQUNSLEtBQUs7RUFDTCxNQUFNO0VBQ04saUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQix3QkFBd0I7RUFDeEIsV0FBVztFQUNYLFVBQVU7RUFDVixnQkFBZ0I7O0VBRWhCLDJDQUEyQztFQUMzQyxvQ0FBb0M7RUFDcEMsb0NBQW9DOztFQUVwQyx3Q0FBd0M7RUFDeEMsaUNBQWlDO0VBQ2pDLGlDQUFpQzs7RUFFakMsdUNBQXVDO0VBQ3ZDLGdDQUFnQztFQUNoQyxnQ0FBZ0M7O0VBRWhDLHNDQUFzQztFQUN0QywrQkFBK0I7RUFDL0IsK0JBQStCOztFQUUvQixtQ0FBbUM7RUFDbkMsNEJBQTRCO0VBQzVCLDRCQUE0QjtBQUM5Qjs7QUFHQTtFQUNFLHFCQUFxQjtFQUNyQix3QkFBd0I7RUFLeEIsNkJBQTZCO0FBQy9COztBQUdBO0VBQ0U7SUFDRSxTQUFTO0VBQ1g7RUFDQTtJQUNFLHdCQUF3QjtFQUMxQjtBQUNGOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixvQkFBb0I7RUFDcEIsc0JBQXNCO0VBQ3RCLFdBQVc7QUFDYjs7QUFHQTtFQUNFLDBCQUEwQjtFQUMxQixZQUFZO0VBQ1osaUNBQWlDO0VBQ2pDLDREQUE0RDtFQUM1RCxzQkFBc0I7RUFDdEIsVUFBVTtBQUNaOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtFQUNaLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsOEJBQThCO0VBQzlCLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLFFBQVE7RUFDUixPQUFPO0VBQ1AsVUFBVTtFQUNWLGtCQUFrQjtFQUNsQiw4Q0FBOEM7QUFDaEQ7O0FBQ0E7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixRQUFRO0VBQ1IsT0FBTztFQUNQLCtDQUErQztBQUNqRDs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQSxpQkFDNEIsV0FBVztFQUNyQyxnQkFBZ0I7RUFDaEIsTUFBTTtFQUNOLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsOEJBQThCO0VBQzlCLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLHlCQUF5QjtFQUN6QixtQ0FBbUM7RUFDbkMsZUFBZTtFQUNmLHNCQUFzQjtFQUN0QixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLCtDQUErQztFQUMvQyxXQUFXO0FBQ2I7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7Ozs7Ozs7Ozs7O0dBV0c7O0FBRUg7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGVBQWU7QUFDakI7O0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGVBQWU7RUFDZixxQkFBcUI7RUFDckIsVUFBVTtFQUNWLFdBQVc7RUFDWCxxQ0FBcUM7RUFDckMsb0NBQW9DO0VBS3BDLHdCQUF3QjtBQUMxQjs7QUFDQTtFQUNFLGdCQUFnQjtFQUtoQiwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQiw4QkFBOEI7RUFDOUIsb0JBQW9CO0VBQ3BCLGtDQUFrQztFQUNsQyxXQUFXO0VBQ1gsZUFBZTtFQUNmLHNCQUFzQjtFQUN0Qiw4Q0FBOEM7RUFDOUMsV0FBVztBQUNiOztBQUdBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1DQUFtQztFQUNuQyxvQ0FBb0M7RUFDcEMscUNBQXFDOztFQUVyQyxnQ0FBZ0M7RUFDaEMsaUNBQWlDO0VBQ2pDLGtDQUFrQzs7RUFFbEMsK0JBQStCO0VBQy9CLGdDQUFnQztFQUNoQyxpQ0FBaUM7O0VBRWpDLDhCQUE4QjtFQUM5QiwrQkFBK0I7RUFDL0IsZ0NBQWdDOztFQUVoQywyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFO0lBQ0UsVUFBVTtJQUNWLGdCQUFnQjtFQUNsQjtFQUNBO0lBQ0UsVUFBVTtJQUNWLGFBQWE7RUFDZjtBQUNGOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIseUJBQWlCO1VBQWpCLGlCQUFpQjtBQUNuQjs7QUFDQTtFQUNFLFlBQVk7RUFDWixrQkFBa0I7QUFDcEI7O0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsa0JBQWtCO0FBQ3BCOztBQUNBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxtQ0FBbUM7RUFDbkMsZUFBZTtFQUNmLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osbUNBQW1DO0VBQ25DLGVBQWU7QUFDakI7O0FBR0E7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsd0JBQXdCO0VBQ3hCLHFCQUFxQjtFQUNyQixnQkFBZ0I7RUFDaEIsU0FBUztFQUNULEtBQUs7RUFDTCxpQkFBaUI7RUFDakIsV0FBVztFQUNYLFVBQVU7RUFDVixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFFBQVE7RUFDUixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLHlCQUF5QjtFQUN6QixrQ0FBa0M7RUFDbEMsY0FBYztFQUNkLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsV0FBVztFQUNYLE1BQU07RUFDTixrQkFBa0I7RUFDbEIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtBQUN0Qjs7QUFFQSxnQkFBZ0IseUNBQXlDO0VBQ3ZELG9CQUFvQjtFQUNwQixVQUFVLEVBQUUsWUFBWTtBQUMxQjs7QUFFQSx5QkFBeUIsNEJBQTRCO0VBQ25ELG9CQUFvQjtBQUN0Qjs7QUFFQSwwQkFBMEIsbUJBQW1CO0VBQzNDLG9CQUFvQjtBQUN0Qjs7QUFHQTtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsT0FBTztFQUNQLFFBQVE7RUFDUixjQUFjO0VBQ2QsV0FBVztFQUNYLFNBQVM7RUFDVCwwQkFBMEI7RUFLMUIsZ0NBQWdDO0VBQ2hDLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUtaLDJDQUEyQztFQUMzQyw0QkFBNEI7RUFDNUIsMEJBQTBCO0VBQzFCLFFBQVE7QUFDVjs7QUFFQTtFQUNFLFVBQVU7RUFDVixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRTtJQUNFLGVBQWU7SUFDZixlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsV0FBVztJQUNYLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLE1BQU07SUFDTixXQUFXO0lBQ1gsUUFBUTtJQUNSLFdBQVc7SUFDWCw0QkFBNEI7SUFDNUIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixzQkFBc0I7SUFDdEIsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLFVBQVU7RUFDWjs7RUFFQTtJQUNFLGdCQUFnQjtJQUNoQiw0QkFBNEI7RUFDOUI7O0VBRUE7SUFDRSw4QkFBOEI7SUFDOUIsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UscUJBQXFCO0VBQ3ZCO0FBQ0Y7O0FBR0E7RUFDRTtJQUNFLGdCQUFnQjtJQUNoQixzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxnQkFBZ0I7RUFDbEI7O0VBRUE7OztLQUdHOztFQUVIO0lBQ0UsNkJBQTZCO0VBQy9COztFQUVBOztLQUVHOztFQUVIO0lBQ0Usc0JBQXNCO0lBQ3RCLGVBQWU7RUFDakI7RUFDQTtJQUNFLFdBQVc7SUFDWCxTQUFTO0VBQ1g7O0VBRUE7SUFDRSxlQUFlO0lBQ2YsaUJBQWlCO0VBQ25CO0VBQ0E7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxlQUFlO0lBQ2YsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsZUFBZTtFQUNqQjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxNQUFNO0VBQ1I7O0VBRUE7SUFDRSxlQUFlO0lBQ2YsbUJBQW1CO0VBQ3JCOztFQUVBO0lBS0UsZUFBZTs7RUFFakI7O0VBRUE7SUFDRSxZQUFZO0lBQ1osZUFBZTtJQUNmO0VBQ0Y7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsWUFBWTtJQUNaLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsOEJBQThCO0lBQzlCLGlCQUFpQjtFQUNuQjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxnQkFBZ0I7RUFDbEI7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsZUFBZTtFQUNqQjtBQUNGIiwiZmlsZSI6InB1YmxpY2F0aW9ucy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyogLnBhZ2Utd3JhcHBlci5oYXB0aWMge1xuICBzY3JvbGwtc25hcC10eXBlOiB5IG1hbmRhdG9yeTtcbn0gKi9cblxuLnNlY3Rpb24taGVhZGVyIHtcbiAgbWFyZ2luLXRvcDogdmFyKC0tdG9wLW1hcmdpbi1tZW51KTtcbiAgcGFkZGluZy10b3A6IHZhcigtLXdpbmRvdy1tYXJnaW4tdG9wKTtcbn1cblxuLnNlY3Rpb24taGVhZGVyLmhhcHRpYyB7XG4gIHNjcm9sbC1zbmFwLWFsaWduOnN0YXJ0O1xufVxuXG5cbi5zZWFyY2gtY29udHJvbHMge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogODBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgc2Nyb2xsLXNuYXAtYWxpZ246IHN0YXJ0O1xuICAvKiBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47ICovXG59XG4uc2VhcmNoLWNvbnRyb2xzLmhhcHRpYyB7XG4gIHNjcm9sbC1zbmFwLWFsaWduOiBzdGFydDtcbn1cblxuLnB1YmxpY2F0aW9uLXR5cGVzLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1zZWxmOiBiYXNlbGluZTtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG5cbi5ib2R5LXRpdGxlIHtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG59XG5cbi5wdWJsaWNhdGlvbi10eXBlcyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LWZhbWlseTogdmFyKC0tYmFzZS1mb250LXRpdGxlKTtcbiAgbWFyZ2luLXJpZ2h0OiAxLjR2dztcbiAgbWFyZ2luLWJvdHRvbTogMC44dnc7XG4gIHBhZGRpbmc6IDJweCAxMHB4O1xuICBmb250LXNpemU6IDF2dztcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgY3Vyc29yOnBvaW50ZXI7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4ucHVibGljYXRpb24tdHlwZXMuaGlkZGVuIHtcbiAgZGlzcGxheTpub25lO1xufVxuXG4ucHVibGljYXRpb24tdHlwZXM6YWZ0ZXIge1xuICBjb250ZW50OiBhdHRyKGRhdGEtdGV4dCk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogbm9uZTtcbiAgd2lkdGg6IDA7XG4gIHRvcDowO1xuICBsZWZ0OjA7XG4gIHBhZGRpbmc6IDJweCAxMHB4O1xuICBib3JkZXItcmFkaXVzOiAzMHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcik7XG4gIGNvbG9yOiAjZWVlO1xuICB6LWluZGV4OiAxO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBtb3ZlQmFja2dyb3VuZCBlYXNlIDAuM3M7XG4gIC13ZWJraXQtYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTtcbiAgLXdlYmtpdC1hbmltYXRpb24tcGxheS1zdGF0ZTogcGF1c2VkO1xuXG4gIC1tb3otYW5pbWF0aW9uOiBtb3ZlQmFja2dyb3VuZCBlYXNlIDAuM3M7XG4gIC1tb3otYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTtcbiAgLW1vei1hbmltYXRpb24tcGxheS1zdGF0ZTogcGF1c2VkO1xuXG4gIC1tcy1hbmltYXRpb246IG1vdmVCYWNrZ3JvdW5kIGVhc2UgMC4zcztcbiAgLW1zLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XG4gIC1tcy1hbmltYXRpb24tcGxheS1zdGF0ZTogcGF1c2VkO1xuXG4gIC1vLWFuaW1hdGlvbjogbW92ZUJhY2tncm91bmQgZWFzZSAwLjNzO1xuICAtby1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxO1xuICAtby1hbmltYXRpb24tcGxheS1zdGF0ZTogcGF1c2VkO1xuXG4gIGFuaW1hdGlvbjogbW92ZUJhY2tncm91bmQgZWFzZSAwLjNzO1xuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxO1xuICBhbmltYXRpb24tcGxheS1zdGF0ZTogcGF1c2VkO1xufVxuXG5cbi5wdWJsaWNhdGlvbi10eXBlcy5hY3RpdmU6YWZ0ZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAyMHB4KTtcbiAgLXdlYmtpdC1hbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZztcbiAgLW1vei1hbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZztcbiAgLW1zLWFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nO1xuICAtby1hbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZztcbiAgYW5pbWF0aW9uLXBsYXktc3RhdGU6IHJ1bm5pbmc7XG59XG5cblxuQGtleWZyYW1lcyBtb3ZlQmFja2dyb3VuZCB7XG4gIDAlIHtcbiAgICB3aWR0aDogMCU7XG4gIH1cbiAgMTAwJSB7XG4gICAgd2lkdGg6IGNhbGMoMTAwJSAtIDIwcHgpO1xuICB9XG59XG5cbi5zZWFyY2gtYm94IHtcbiAgd2lkdGg6IGF1dG87XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYWxpZ24tc2VsZjogYm90dG9tO1xuICBtYXJnaW4tdG9wOiAtMTNweDtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgei1pbmRleDogOTg7XG59XG5cblxuLnB1YmxpY2F0aW9uLWxpc3Qge1xuICB3aWR0aDogdmFyKC0td2luZG93LXdpZHRoKTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBtYXJnaW4tbGVmdDogdmFyKC0td2luZG93LW1hcmdpbik7XG4gIHBhZGRpbmc6IDcwcHggdmFyKC0tY29udGVudC1tYXJnaW4pIHZhcigtLXdpbmRvdy1tYXJnaW4tdG9wKTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgei1pbmRleDogMDtcbn1cblxuLnB1YmxpY2F0aW9uLWxpc3QuZGFya01vZGUge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1iYXNlLWNvbG9yMik7XG59XG5cbi5zZWFyY2gtYnV0dG9uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMzlweDtcbiAgaGVpZ2h0OiAzOXB4O1xuICBwYWRkaW5nOiA4cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yKTtcbiAgYm9yZGVyLXJhZGl1czogMzlweDtcbiAgbWFyZ2luLWxlZnQ6IGNhbGMoMTAwJSAtIDYwcHgpO1xuICBtYXJnaW4tdG9wOiAtMTIzcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNsb3NlLXNlYXJjaCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogbm9uZTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgd2lkdGg6IDM0cHg7XG4gIGxlZnQ6NTAlO1xuICB0b3A6NTAlO1xuICBoZWlnaHQ6NHB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHJvdGF0ZSg0NWRlZyk7XG59XG4uY2xvc2Utc2VhcmNoOmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICB3aWR0aDogMzRweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBoZWlnaHQ6NHB4O1xuICBsZWZ0OjUwJTtcbiAgdG9wOjUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgcm90YXRlKC05MGRlZyk7XG59XG5cbi5zZWFyY2gtYnV0dG9uLmNsb3NlIHtcbiAgbWFyZ2luLXRvcDotNzBweDtcbn1cblxuLnNlYXJjaC1idXR0b24uY2xvc2UgLmNsb3NlLXNlYXJjaCB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuXG4uc2VhcmNoLWJ1dHRvbi5jbG9zZSAjc2VhcmNoLWljb24ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uc3RpY2t5LWhlYWRlciB7XG4gIHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreTsgLyogU2FmYXJpICovXG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMDtcbiAgZGlzcGxheTpmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGhlaWdodDogMjhweDtcbiAgbGluZS1oZWlnaHQ6IDI3cHg7XG4gIGNvbG9yOiB2YXIoLS1jb2xvcik7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1iYXNlLWZvbnQtdGl0bGUpO1xuICBmb250LXNpemU6IDE2cHg7XG4gIC8qIG1hcmdpbi10b3A6IDEwcHg7ICovXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGJhY2tncm91bmQ6ICNGRkY7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1jb2xvcikhaW1wb3J0YW50O1xuICB6LWluZGV4OiA5OTtcbn1cblxuLnN0aWNreS1oZWFkZXIuZGFya01vZGUge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1iYXNlLWNvbG9yMik7XG59XG5cbi8qIC5zdGlja3ktaGVhZGVyLnN0dWNrIHtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgdG9wOjA7XG4gIG1hcmdpbi10b3A6MDtcbiAgbGVmdDoxMjBweDtcbiAgd2lkdGg6IHZhcigtLXdpbmRvdy13aWR0aCk7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmc6IDAgdmFyKC0tY29udGVudC1tYXJnaW4pO1xuICBjb2xvcjojZWVlO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcik7XG4gIHotaW5kZXg6IDIwO1xufSAqL1xuXG4uY29sdW1uLXRpdGxlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLnN0aWNreS1oZWFkZXIgLmFycm93IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiAxMnB4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDZweDtcbiAgaGVpZ2h0OiA2cHg7XG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB2YXIoLS1jb2xvcik7XG4gIGJvcmRlci1yaWdodDogMnB4IHNvbGlkIHZhcigtLWNvbG9yKTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAtby10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbn1cbi5zdGlja3ktaGVhZGVyIC5hcnJvdy51cCB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTEzNWRlZyk7XG4gIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoLTEzNWRlZyk7XG4gIC1vLXRyYW5zZm9ybTogcm90YXRlKC0xMzVkZWcpO1xuICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoLTEzNWRlZyk7XG4gIHRyYW5zZm9ybTogcm90YXRlKC0xMzVkZWcpO1xufVxuXG4uc3RpY2t5LWhlYWRlci5zdHVjayAuYXJyb3cge1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2ZmZjtcbiAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgI2ZmZjtcbn1cblxuLnB1YmxpY2F0aW9uLWl0ZW0tY29udGFpbmVyLmhhcHRpYyB7XG4gIHNjcm9sbC1zbmFwLWFsaWduOnN0YXJ0O1xuICAvKiB0b3A6IDEwcHg7ICovXG59XG5cbi5wdWJsaWNhdGlvbi1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgZmxleC13cmFwOiBub3dyYXA7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1iYXNlLWZvbnQtYm9keSk7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiA2MHB4IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDE3MCwxNzAsMTcwLDAuMyk7XG4gIHotaW5kZXg6IDk1O1xufVxuXG5cbi5wdWJsaWNhdGlvbi1pdGVtLWNvbnRhaW5lcjpsYXN0LWNoaWxkIC5wdWJsaWNhdGlvbi1pdGVtIHtcbiAgYm9yZGVyLWJvdHRvbTpub25lO1xuICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZUluIGVhc2UgMS41cztcbiAgLXdlYmtpdC1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxO1xuICAtd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuXG4gIC1tb3otYW5pbWF0aW9uOiBmYWRlSW4gZWFzZSAxLjVzO1xuICAtbW96LWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XG4gIC1tb3otYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG5cbiAgLW1zLWFuaW1hdGlvbjogZmFkZUluIGVhc2UgMS41cztcbiAgLW1zLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XG4gIC1tcy1hbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcblxuICAtby1hbmltYXRpb246IGZhZGVJbiBlYXNlIDEuNXM7XG4gIC1vLWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XG4gIC1vLWFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuXG4gIGFuaW1hdGlvbjogZmFkZUluIGVhc2UgMS41cztcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTtcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG59XG5cbkBrZXlmcmFtZXMgZmFkZUluIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgbWFyZ2luLXRvcDogNjBweDtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cbn1cblxuLnB1YmxpY2F0aW9uLXllYXIge1xuICBjb2xvcjogdmFyKC0tY29sb3IpO1xuICB3aWR0aDogMTAwcHg7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBsaW5lLWhlaWdodDogMzRweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG4uaGVhZGVyLXllYXIge1xuICB3aWR0aDogMTAwcHg7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbn1cbi5oZWFkZXItZGV0YWlscyB7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0MDBweCk7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbn1cbi5oZWFkZXItY2l0YXRpb25zIHtcbiAgd2lkdGg6IDE5NXB4O1xufVxuXG4uc2VhcmNoUmVzdWx0cyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgY29sb3I6ICM5OTk7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1iYXNlLWZvbnQtdGl0bGUpO1xuICBmb250LXNpemU6IDE4cHg7XG4gIHdpZHRoOiAxMDAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDUwcHg7XG4gIC8qIGZsb2F0OnJpZ2h0OyAqL1xufVxuXG4ucHVibGljYXRpb24tZGV0YWlscywgLmhlYWRlci1kZXRhaWxzIHtcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDQwMHB4KTtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xufVxuXG4ucHVibGljYXRpb24tY2l0YXRpb25zIHtcbiAgd2lkdGg6IDEwMHB4O1xuICBmb250LWZhbWlseTogdmFyKC0tYmFzZS1mb250LXRpdGxlKTtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG5cbi5ib2R5LXRleHQuYm9sZCB7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5wdWJsaWNhdGlvbi1saW5rIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6cG9pbnRlcjtcbiAgd2lkdGg6IDYwcHg7XG4gIGhlaWdodDogMzBweDtcbn1cblxuLnJvdy1pdGVtIHtcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xufVxuXG5pbnB1dFt0eXBlPVwidGV4dFwiXSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIGxlZnQ6MTAwJTtcbiAgdG9wOjA7XG4gIG1hcmdpbi10b3A6IC00MHB4O1xuICBib3JkZXI6bm9uZTtcbiAgcGFkZGluZzogMDtcbiAgaGVpZ2h0OiAxMTBweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgd2lkdGg6IDA7XG4gIGNvbG9yOiB2YXIoLS1jb2xvcik7XG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG4gIGNhcmV0LWNvbG9yOiB2YXIoLS1jb2xvcik7XG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMnZ3O1xuICB6LWluZGV4OiAtMTtcbn1cblxuaW5wdXRbdHlwZT1cInRleHRcIl06Zm9jdXMge1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbmlucHV0W3R5cGU9XCJ0ZXh0XCJdLnZpc2libGUge1xuICB6LWluZGV4OiA1MDtcbiAgd2lkdGg6IDEwMCU7XG4gIGxlZnQ6MDtcbiAgcGFkZGluZzogMTBweCAzMHB4O1xuICB0cmFuc2l0aW9uOiBhbGwgMC44cztcbn1cblxuaW5wdXRbdHlwZT1cInRleHRcIl0uZGFya01vZGUge1xuICBiYWNrZ3JvdW5kOiAjMzMzO1xuICBjb2xvcjogdmFyKC0tY29sb3IzKTtcbn1cblxuOjpwbGFjZWhvbGRlciB7IC8qIENocm9tZSwgRmlyZWZveCwgT3BlcmEsIFNhZmFyaSAxMC4xKyAqL1xuICBjb2xvcjogdmFyKC0tY29sb3IzKTtcbiAgb3BhY2l0eTogMTsgLyogRmlyZWZveCAqL1xufVxuXG46LW1zLWlucHV0LXBsYWNlaG9sZGVyIHsgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTAtMTEgKi9cbiAgY29sb3I6IHZhcigtLWNvbG9yMyk7XG59XG5cbjo6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHsgLyogTWljcm9zb2Z0IEVkZ2UgKi9cbiAgY29sb3I6IHZhcigtLWNvbG9yMyk7XG59XG5cblxuLmFycm93LWxpbmsge1xuICBkaXNwbGF5OmlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDUwJTtcbiAgbWFyZ2luLWxlZnQ6IDA7XG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDA7XG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCAjOTk5O1xuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xuICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xuICAtby10cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbiAgLW1zLXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcbiAgb3BhY2l0eTogMC4zO1xuICBwYWRkaW5nOiAwIDEwcHg7XG59XG5cbi5hcnJvdy1saW5rOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxMHB4O1xuICBoZWlnaHQ6IDEwcHg7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTYyJSkgcm90YXRlKDQ1ZGVnKTtcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtNjIlKSByb3RhdGUoNDVkZWcpO1xuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtNjIlKSByb3RhdGUoNDVkZWcpO1xuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTYyJSkgcm90YXRlKDQ1ZGVnKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTYyJSkgcm90YXRlKDQ1ZGVnKTtcbiAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgIzk5OTtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICM5OTk7XG4gIHJpZ2h0OiAwO1xufVxuXG4ucHVibGljYXRpb24taXRlbTpob3ZlciAuYXJyb3ctbGluay5ob3ZlcmVmZmVjdCB7XG4gIG9wYWNpdHk6IDE7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxNjAwcHgpIHtcbiAgLnB1YmxpY2F0aW9uLXR5cGVzIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgbWFyZ2luOiAzcHggNHB4O1xuICB9XG5cbiAgLnNlYXJjaC1jb250cm9scyB7XG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDtcbiAgfVxuXG4gIC5zZWFyY2gtYm94IHtcbiAgICB3aWR0aDogYXV0bztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cblxuICBpbnB1dFt0eXBlPVwidGV4dFwiXSB7XG4gICAgbGVmdDowO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHRvcDoyMHB4O1xuICAgIGJvcmRlcjpub25lO1xuICAgIHBhZGRpbmc6IDIwcHggODBweCAyMHB4IDMwcHg7XG4gICAgbWFyZ2luOiA1cHggMCAyMHB4O1xuICAgIGhlaWdodDogYXV0bztcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG9wYWNpdHk6IDE7XG4gICAgY29sb3I6IHZhcigtLWNvbG9yKTtcbiAgICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICB6LWluZGV4OiAwO1xuICB9XG5cbiAgaW5wdXRbdHlwZT1cInRleHRcIl0udmlzaWJsZSB7XG4gICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgICBwYWRkaW5nOiAyMHB4IDgwcHggMjBweCAzMHB4O1xuICB9XG5cbiAgLnNlYXJjaC1idXR0b24sIC5zZWFyY2gtYnV0dG9uLmNsb3NlIHtcbiAgICBtYXJnaW4tbGVmdDogY2FsYygxMDAlIC0gNTBweCk7XG4gICAgbWFyZ2luLXRvcDogLTUxcHg7XG4gIH1cblxuICAuc2VhcmNoLWJ1dHRvbi5jbG9zZSAuY2xvc2Utc2VhcmNoIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgLnNlYXJjaC1idXR0b24uY2xvc2UgI3NlYXJjaC1pY29uLCAucHVibGljYXRpb24tdHlwZXMuaGlkZGVuIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cbn1cblxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxNDAwcHgpIHtcbiAgLnNlYXJjaC1jb250cm9scyB7XG4gICAgbWFyZ2luLXRvcDogODBweDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG5cbiAgLnB1YmxpY2F0aW9uLXR5cGVzLWNvbnRhaW5lciB7XG4gICAgbWFyZ2luLXRvcDogNDBweDtcbiAgfVxuXG4gIC8qIC5zZWFyY2gtYnV0dG9uIHtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gIH0gKi9cblxuICAucHVibGljYXRpb24td3JhcHBlci5oYXB0aWMge1xuICAgIHNjcm9sbC1zbmFwLXR5cGU6IHkgcHJveGltaXR5O1xuICB9XG5cbiAgLyogI3NlYXJjaC1pbnB1dCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfSAqL1xuXG4gIC5wdWJsaWNhdGlvbi1pdGVtIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHBhZGRpbmc6IDQwcHggMDtcbiAgfVxuICAucHVibGljYXRpb24teWVhciwgLnB1YmxpY2F0aW9uLWRldGFpbHMsIC5wdWJsaWNhdGlvbi1jaXRhdGlvbnMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIC5wdWJsaWNhdGlvbi15ZWFyIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gIH1cbiAgLnN0aWNreS1oZWFkZXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAucHVibGljYXRpb24tY2l0YXRpb25zIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cblxuICAucHVibGljYXRpb24tbGluayB7XG4gICAgbWFyZ2luLXRvcDoyMHB4O1xuICB9XG59XG5cbkBtZWRpYSAgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMjAwcHgpIHtcbiAgLnB1YmxpY2F0aW9uLXllYXIge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBsaW5lLWhlaWdodDogMjhweDtcbiAgfVxuXG4gIC5wdWJsaWNhdGlvbi1jaXRhdGlvbnMge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMDAwcHgpIHtcbiAgLmFycm93LWxpbms6YWZ0ZXIge1xuICAgIHRvcDogMDtcbiAgfVxuXG4gIC5wdWJsaWNhdGlvbi10eXBlcyB7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gIH1cblxuICAucHVibGljYXRpb24tdHlwZXM6YWZ0ZXIge1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBub25lO1xuICAgIC1tb3otYW5pbWF0aW9uOiBub25lO1xuICAgIC1tcy1hbmltYXRpb246IG5vbmU7XG4gICAgLW8tYW5pbWF0aW9uOiBub25lO1xuICAgIGFuaW1hdGlvbjogbm9uZTtcblxuICB9XG5cbiAgaW5wdXRbdHlwZT1cInRleHRcIl0ge1xuICAgIGhlaWdodDogNzBweDtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgcGFkZGluZzogNnB4IDYwcHggNnB4IDIwcHhcbiAgfVxuXG4gIC5zZWFyY2gtYnV0dG9uLCAuc2VhcmNoLWJ1dHRvbi5jbG9zZSB7XG4gICAgd2lkdGg6IDMwcHg7XG4gICAgaGVpZ2h0OiAzMHB4O1xuICAgIHBhZGRpbmc6IDZweDtcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xuICAgIG1hcmdpbi1sZWZ0OiBjYWxjKDEwMCUgLSAzNXB4KTtcbiAgICBtYXJnaW4tdG9wOiAtNDNweDtcbiAgfVxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4MDBweCkge1xuICAuc2VhcmNoLWNvbnRyb2xzIHtcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICB9XG5cbiAgLnB1YmxpY2F0aW9uLXR5cGVzIHtcbiAgICBsZWZ0OiAtMTBweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gIH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ "G2Gn":
/*!*********************************************************!*\
  !*** ./src/app/components/contact/contact.component.ts ***!
  \*********************************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_content_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/content.service */ "NBun");
/* harmony import */ var src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/multimodal.service */ "bTnw");
/* harmony import */ var src_app_services_drawing_contact_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/drawing-contact.service */ "QUYs");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





function ContactComponent_li_21_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactComponent_li_21_Template_li_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const item_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.linkTo(item_r1.url); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r1.name, " ");
} }
const _c0 = function (a0) { return { darkMode: a0 }; };
class ContactComponent {
    constructor(contentService, multimodalService, drawingContactService) {
        this.contentService = contentService;
        this.multimodalService = multimodalService;
        this.drawingContactService = drawingContactService;
        this.contact_info = null;
        this.current_year = new Date().getFullYear();
        this.config = this.multimodalService.config;
        this.drawingContactService.playClick.subscribe(res => {
            this.multimodalService.playAudioClick();
        });
        this.drawingContactService.playMechanicalClick.subscribe(res => {
            this.multimodalService.playMechanicalClick();
        });
        this.drawingContactService.hapticFeedback.subscribe(res => {
            this.multimodalService.playHapticButtonClick(res);
        });
        this.config.activePage = 'contact';
    }
    ngOnInit() {
        this.contentService.getContactInfo().subscribe(res => {
            this.contact_info = res;
        });
        this.drawingContactService.draw();
    }
    linkTo(url) {
        this.multimodalService.playAudioClick();
        this.multimodalService.playHapticButtonClick(150);
        window.open(url);
    }
    onResize(event) {
        this.drawingContactService.draw();
    }
}
ContactComponent.ɵfac = function ContactComponent_Factory(t) { return new (t || ContactComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_content_service__WEBPACK_IMPORTED_MODULE_1__["ContentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_2__["MultimodalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_drawing_contact_service__WEBPACK_IMPORTED_MODULE_3__["DrawingContactService"])); };
ContactComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ContactComponent, selectors: [["app-contact"]], hostBindings: function ContactComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resize", function ContactComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
    } }, decls: 23, vars: 9, consts: [[1, "page-wrapper"], [1, "page-section", "start", 3, "ngClass"], [1, "vertical-aligned-textblock"], [1, "basic-text-style-large"], ["id", "contact-page-details", 1, "contact-details", "contact-page"], [1, "email", "buttonEl", 3, "click"], [1, "email-text", "buttonEl"], [1, "email-text", "mail", "buttonEl"], [1, "arrow-link", "buttonEl"], [1, "social-media-list", "contact"], ["class", "buttonEl", 3, "click", 4, "ngFor", "ngForOf"], ["id", "svgBg"], [1, "buttonEl", 3, "click"]], template: function ContactComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Contact me");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactComponent_Template_div_click_14_listener() { return ctx.linkTo("mailto:" + (ctx.contact_info == null ? null : ctx.contact_info.email)); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "ul", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, ContactComponent_li_21_Template, 2, 1, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](7, _c0, (ctx.config == null ? null : ctx.config.theme) === "dark-mode"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.contact_info == null ? null : ctx.contact_info.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.contact_info == null ? null : ctx.contact_info.function, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.contact_info == null ? null : ctx.contact_info.address);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.contact_info == null ? null : ctx.contact_info.address_line2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.contact_info == null ? null : ctx.contact_info.email);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.contact_info == null ? null : ctx.contact_info.social_media);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], styles: ["a[_ngcontent-%COMP%] {\n  text-decoration: none;\n  cursor: pointer;\n  outline: none;\n}\n\n.site-navigation[_ngcontent-%COMP%] {\n  position: fixed;\n  top:0;\n  left:0;\n  width: 120px;\n  height: 100vh;\n  border-right: 1px solid var(--base-color2);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  box-sizing: border-box;\n  padding: 40px;\n  \n  transition: all 0.2s ease;\n  z-index: 200;\n  min-height: 600px;\n}\n\n.site-navigation.dark-mode[_ngcontent-%COMP%] {\n  background: var(--base-color2);\n  border-right: 1px solid rgba(255,255,255,0.5);\n}\n\n.site-navigation.open[_ngcontent-%COMP%] {\n  background: var(--color);\n  color: var(--base-color1);\n  border-right: 1px solid var(--base-color1);\n}\n\n.open-site-navigation[_ngcontent-%COMP%] {\n  position: fixed;\n  top:0;\n  height: 100vh;\n  background: var(--color);\n  width: 100vw;\n  margin-left: -100vw;\n  transition: all 0.5s ease-in-out;\n  overflow: hidden;\n  z-index: 199;\n}\n\n.open-site-navigation.visible[_ngcontent-%COMP%] {\n  margin-left:0;\n  box-shadow: 5px 0 20px rgba(0,0,0,0.2);\n}\n\n.screen-multimodal-menu[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n\n.mobile-multimodal-menu[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  bottom:0;\n  margin-bottom: 150px;\n  height: auto;\n  width: 100%;\n  text-align:center;\n}\n\n.site-navigation-title[_ngcontent-%COMP%] {\n  position: absolute;\n  transform: translate(-40px, -50%) rotate(-90deg);\n  display: inline-block;\n  bottom: 8vh;\n  left:0;\n  font-family: var(--base-font-title);\n  font-weight: 400;\n  font-size: var(--font-size-medium);\n  height: 120px;\n  width: 200px;\n  line-height: 120px;\n}\n\n.menu[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  width: 40px;\n  height: 20px;\n  overflow:visible;\n  z-index: 100;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.menu[_ngcontent-%COMP%]::before, .menu[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  width: 40px;\n  height: 0;\n  border-bottom: 4px solid var(--base-color2);\n  background: transparent;\n  transition: all 0.2s ease;\n}\n\n#sidebar-menu.open[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]::before, #sidebar-menu.open[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]::after, #sidebar-menu.dark-mode[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]::before, #sidebar-menu.dark-mode[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]::after {\n  border-bottom: 4px solid var(--base-color1);\n}\n\n.menu[_ngcontent-%COMP%]::before {\n  top: 0;\n  left:0;\n}\n\n.menu[_ngcontent-%COMP%]::after {\n  bottom: 2px;\n  right: 0;\n}\n\n.menu.hovereffect[_ngcontent-%COMP%]:hover::before {\n  top: 3px;\n  left: 5px;\n}\n\n.menu.hovereffect[_ngcontent-%COMP%]:hover::after {\n  bottom: 5px;\n  right: 5px;\n}\n\n.menu.hovereffect.open[_ngcontent-%COMP%]::before {\n  top: 8px!important;\n  left: 0!important;\n}\n\n.menu.hovereffect.open[_ngcontent-%COMP%]::after {\n  right: 0px!important;\n  bottom: 8px!important;\n}\n\n.menu[_ngcontent-%COMP%]:active::before, .menu.open[_ngcontent-%COMP%]::before {\n  top: 8px;\n  left: 0;\n  transform: rotate(45deg);\n}\n\n.menu[_ngcontent-%COMP%]:active::after, .menu.open[_ngcontent-%COMP%]::after {\n  bottom: 8px;\n  right: 1px;\n  transform: rotate(135deg);\n}\n\nul.menu-items[_ngcontent-%COMP%] {\n  list-style-type: none;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-60%);\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  padding: 15vh var(--content-margin);\n  margin: 0 0 0 120px;\n  width: var(--window-width);\n  height: auto;\n  box-sizing: border-box;\n  justify-content: space-between;\n}\n\n#open-menu.animate[_ngcontent-%COMP%] {\n  animation: fadeInMenu ease 1.5s;\n}\n\n@keyframes fadeInMenu {\n  0% {\n    opacity: 0;\n    margin-left: 60px;\n  }\n  20% {\n    opacity: 0;\n    margin-left: 60px;\n  }\n  100% {\n    opacity: 1;\n    margin-left: var(--window-margin);\n  }\n}\n\n#menu-contact-details.animate[_ngcontent-%COMP%] {\n  animation: fadeInContactDetails ease 2s;\n}\n\n@keyframes fadeInContactDetails {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\nul.menu-items[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n  margin: 8vh 1vw;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.fill-text-on-hover[_ngcontent-%COMP%] {\n  color: var(--base-color1);\n  font-family: var(--base-font-body);\n  font-weight: 500;\n  font-size: 2.8vw;\n  padding:0;\n  margin:0;\n  white-space: nowrap;\n  text-rendering: geometricPrecision;\n}\n\nul.menu-items[_ngcontent-%COMP%]   li.hovereffect[_ngcontent-%COMP%]   .fill-text-on-hover[_ngcontent-%COMP%]:after{\n  content: attr(data-text);\n  width:0%;\n  color: var(--base-color1);\n  position:absolute;\n  top:0;\n  left:0;\n  overflow:hidden;\n  transition: 0.8s ease-in-out;\n  font-family: var(--base-font-body);\n  font-weight: 500;\n  font-size: 2.8vw;\n  white-space: nowrap;\n  text-rendering: geometricPrecision;\n}\n\nul.menu-items[_ngcontent-%COMP%]   li.hovereffect[_ngcontent-%COMP%]:hover   .fill-text-on-hover[_ngcontent-%COMP%] {\n  color: rgba(255,255,255,0.3);\n}\n\nul.menu-items[_ngcontent-%COMP%]   li.hovereffect[_ngcontent-%COMP%]:hover   .fill-text-on-hover[_ngcontent-%COMP%]:after {\n  width:100%;\n}\n\n.contact-details[_ngcontent-%COMP%] {\n  position: absolute;\n  width: var(--window-width);\n  margin-left: var(--window-margin);\n  box-sizing: border-box;\n  left:0;\n  bottom:0;\n  padding: 8vh var(--content-margin);\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n\nul.social-media-list[_ngcontent-%COMP%] {\n  list-style-type: none;\n  display: inline-flex;\n  flex-direction: row;\n  padding: 10px 0;\n  margin:0;\n  width: auto;\n  height: auto;\n  font-family: var(--base-font-title);\n  text-transform: uppercase;\n  box-sizing: border-box;\n  color: var(--base-color1);\n  font-size: 22px;\n  vertical-align: bottom;\n}\n\nul.social-media-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 0 1.5vw 0 5vw;\n  width: auto;\n  cursor: pointer;\n}\n\n.email-text[_ngcontent-%COMP%] {\n  font-family: var(--base-font-title);\n  text-transform: uppercase;\n  font-size: 22px;\n  padding: 0;\n  margin: 0.5em 1.5vw;\n  color: var(--base-color1);\n  vertical-align: top;\n}\n\n.email-text.mail[_ngcontent-%COMP%] {\n  display: inline-block;\n  color: rgba(255,255,255,0.5);\n  font-family: var(--base-font-body);\n  text-transform: none;\n  font-weight: 300;\n  cursor:pointer;\n}\n\n.email-text[_ngcontent-%COMP%]:hover   .arrow-link[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  opacity: 0.5;\n}\n\n.email-text[_ngcontent-%COMP%]:hover   .arrow-link.hovereffect[_ngcontent-%COMP%] {\n  margin-left: 20px;\n  opacity: 1;\n}\n\n\n\n.theme-toggle-switch[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.theme-state-icon[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 24px;\n  height: 24px;\n  background: #eee;\n  border-radius: 24px;\n  margin: 15px 8px;\n}\n\n.theme-state-icon[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: relative;\n  opacity: 0;\n  width: 24px;\n  left: 20px;\n  top: -20px;\n  height: 24px;\n  background: var(--base-color2);\n  transition: color 0.8s ease;\n  border-radius: 24px;\n}\n\n.site-navigation.open[_ngcontent-%COMP%]   .theme-state-icon[_ngcontent-%COMP%]::after {\n  background: var(--color);\n}\n\n.theme-state-icon.dark-mode[_ngcontent-%COMP%]::after {\n  left: 7px;\n  top: -7px;\n  opacity: 1;\n  display: inline-block;\n  animation: moveOver 0.7s ease;\n  animation-iteration-count: 1;\n}\n\n@keyframes moveOver {\n  0% {\n    left: 20px;\n    top: -20px;\n    opacity: 0;\n  }\n  20% {\n    left: 20px;\n    top: -20px;\n    opacity: 1;\n  }\n  100% {\n    left: 7px;\n    top: -7px;\n    opacity: 1;\n  }\n}\n\n.switch[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  width: 20px;\n  height: 50px;\n  margin: 0 10px;\n  -webkit-tap-highlight-color: transparent;\n}\n\n\n\n.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n\n\n.slider[_ngcontent-%COMP%] {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  transition: .4s;\n  box-shadow: inset 0px 0px 5px rgba(0,0,0,0.3);\n}\n\n.slider[_ngcontent-%COMP%]:before {\n  position: absolute;\n  content: \"\";\n  height: 20px;\n  width: 20px;\n  box-shadow: 0px 0px 5px rgba(0,0,0,0.3);\n  left: 0px;\n  bottom: 0px;\n  background-color: white;\n  transition: .4s;\n}\n\ninput[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%] {\n  background-color: #000;\n  box-shadow: inset 0px 0px 15px rgba(255, 255, 255, 0.2);\n}\n\n\n\ninput[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%]:before {\n  transform: translateY(-30px);\n  background-color: #444;\n}\n\n\n\n.slider.round[_ngcontent-%COMP%] {\n  border-radius: 20px;\n}\n\n.slider.round[_ngcontent-%COMP%]:before {\n  border-radius: 50%;\n}\n\n@media screen and (max-width: 1400px) {\n  .site-navigation[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 45px var(--content-margin);\n    height: 110px;\n    min-height: 50px;\n    border-bottom: 1px solid var(--base-color2);\n    border-right: none;\n    flex-direction: row;\n    background: var(--base-color1);\n  }\n\n  .theme-toggle-switch[_ngcontent-%COMP%] {\n    flex-direction: row;\n  }\n\n  .theme-state-icon[_ngcontent-%COMP%] {\n    transform: translateY(-68%);\n  }\n\n  ul.menu-items[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .switch[_ngcontent-%COMP%] {\n    width: 50px;\n    height: 20px;\n    margin: 0 10px;\n  }\n\n  input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%]:before {\n    transform: translateX(30px);\n  }\n\n\n  .open-site-navigation[_ngcontent-%COMP%] {\n    position: fixed;\n    margin-left: 0;\n    margin-top: -100vh;\n  }\n\n  .open-site-navigation.visible[_ngcontent-%COMP%] {\n    margin-top: 0;\n    margin-left: 0;\n  }\n\n  .site-navigation.open[_ngcontent-%COMP%], .site-navigation.dark-mode[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 1px solid var(--base-color1);\n  }\n\n\n  @keyframes fadeInMenu {\n    0% {\n      opacity: 0;\n      margin-top: 60px;\n    }\n    20% {\n      opacity: 0;\n      margin-top: 60px;\n    }\n    100% {\n      opacity: 1;\n      margin-top: var(--window-margin);\n    }\n  }\n\n}\n\n@media screen and (max-width: 1000px) {\n\n\n  ul.menu-items[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding: 0 var(--content-margin);\n    transform: translateY(-50%);\n  }\n  ul.menu-items[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: center;\n    margin: 3.5vh 0;\n  }\n\n  .fill-text-on-hover[_ngcontent-%COMP%] {\n    font-size: 5vw;\n  }\n\n  .fill-text-on-hover[_ngcontent-%COMP%]:after {\n    display: none;\n  }\n\n  #menu-contact-details[_ngcontent-%COMP%] {\n    display:none;\n  }\n\n\n  .contact-details[_ngcontent-%COMP%] {\n    flex-direction: column;\n    justify-content:unset;\n  }\n\n  ul.social-media-list[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  ul.social-media-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    margin: 20px 0;\n  }\n\n  .site-navigation[_ngcontent-%COMP%] {\n    padding: 45px var(--content-margin);\n  }\n\n  .email-text[_ngcontent-%COMP%], ul.social-media-list[_ngcontent-%COMP%] {\n    font-size: 18px;\n\n  }\n}\n\n@media screen and (max-width: 900px) {\n  .menu.hovereffect[_ngcontent-%COMP%]:hover::before {\n    top: 0;\n    left:0;\n  }\n\n  .menu.hovereffect[_ngcontent-%COMP%]:hover::after {\n    bottom: 2px;\n    right: 0;\n  }\n\n  .fill-text-on-hover[_ngcontent-%COMP%] {\n    font-size: 6vw;\n  }\n}\n\n@media screen and (max-width: 700px) {\n\n  .site-navigation[_ngcontent-%COMP%] {\n    padding: 44px var(--content-margin);\n    height: 90px;\n    margin-top: -15px;\n    position:fixed;\n  }\n\n  .mobile-multimodal-menu[_ngcontent-%COMP%] {\n    display: inline-block;\n  }\n  .screen-multimodal-menu[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  ul.menu-items[_ngcontent-%COMP%] {\n    transform: translateY(-55%);\n  }\n\n  .fill-text-on-hover[_ngcontent-%COMP%] {\n    font-size: 7vw;\n  }\n\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtFQUNmLEtBQUs7RUFDTCxNQUFNO0VBQ04sWUFBWTtFQUNaLGFBQWE7RUFDYiwwQ0FBMEM7RUFDMUMsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qiw4QkFBOEI7RUFDOUIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixvQ0FBb0M7RUFDcEMseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSw4QkFBOEI7RUFDOUIsNkNBQTZDO0FBQy9DOztBQUdBO0VBQ0Usd0JBQXdCO0VBQ3hCLHlCQUF5QjtFQUN6QiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsS0FBSztFQUNMLGFBQWE7RUFDYix3QkFBd0I7RUFDeEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixnQ0FBZ0M7RUFDaEMsZ0JBQWdCO0VBQ2hCLFlBQVk7QUFDZDs7QUFHQTtFQUNFLGFBQWE7RUFDYixzQ0FBc0M7QUFDeEM7O0FBQ0E7RUFDRSxxQkFBcUI7QUFDdkI7O0FBQ0E7RUFDRSxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixvQkFBb0I7RUFDcEIsWUFBWTtFQUNaLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxrQkFBa0I7RUFLbEIsZ0RBQWdEO0VBQ2hELHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsTUFBTTtFQUNOLG1DQUFtQztFQUNuQyxnQkFBZ0I7RUFDaEIsa0NBQWtDO0VBQ2xDLGFBQWE7RUFDYixZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCOztBQUdBO0VBQ0Usa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osZUFBZTtFQUNmLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFNBQVM7RUFDVCwyQ0FBMkM7RUFDM0MsdUJBQXVCO0VBQ3ZCLHlCQUF5QjtBQUMzQjs7QUFFQTs7OztFQUlFLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLE1BQU07RUFDTixNQUFNO0FBQ1I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsUUFBUTtBQUNWOztBQUVBO0VBQ0UsUUFBUTtFQUNSLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFFBQVE7RUFDUixPQUFPO0VBS1Asd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFVBQVU7RUFLVix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLFFBQVE7RUFLUiwyQkFBMkI7RUFDM0IsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsbUNBQW1DO0VBQ25DLG1CQUFtQjtFQUNuQiwwQkFBMEI7RUFDMUIsWUFBWTtFQUNaLHNCQUFzQjtFQUN0Qiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRTtJQUNFLFVBQVU7SUFDVixpQkFBaUI7RUFDbkI7RUFDQTtJQUNFLFVBQVU7SUFDVixpQkFBaUI7RUFDbkI7RUFDQTtJQUNFLFVBQVU7SUFDVixpQ0FBaUM7RUFDbkM7QUFDRjs7QUFFQTtFQUNFLHVDQUF1QztBQUN6Qzs7QUFFQTtFQUNFO0lBQ0UsVUFBVTtFQUNaO0VBQ0E7SUFDRSxVQUFVO0VBQ1o7RUFDQTtJQUNFLFVBQVU7RUFDWjtBQUNGOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YsZUFBZTtFQUNmLHdDQUF3QztBQUMxQzs7QUFHQTtFQUNFLHlCQUF5QjtFQUN6QixrQ0FBa0M7RUFDbEMsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixTQUFTO0VBQ1QsUUFBUTtFQUNSLG1CQUFtQjtFQUNuQixrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsUUFBUTtFQUNSLHlCQUF5QjtFQUN6QixpQkFBaUI7RUFDakIsS0FBSztFQUNMLE1BQU07RUFDTixlQUFlO0VBQ2YsNEJBQTRCO0VBQzVCLGtDQUFrQztFQUNsQyxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixrQ0FBa0M7QUFDcEM7O0FBQ0E7RUFDRSw0QkFBNEI7QUFDOUI7O0FBR0E7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsMEJBQTBCO0VBQzFCLGlDQUFpQztFQUNqQyxzQkFBc0I7RUFDdEIsTUFBTTtFQUNOLFFBQVE7RUFDUixrQ0FBa0M7RUFDbEMsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsUUFBUTtFQUNSLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUNBQW1DO0VBQ25DLHlCQUF5QjtFQUN6QixzQkFBc0I7RUFDdEIseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsV0FBVztFQUNYLGVBQWU7QUFDakI7O0FBR0E7RUFDRSxtQ0FBbUM7RUFDbkMseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLHlCQUF5QjtFQUN6QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsNEJBQTRCO0VBQzVCLGtDQUFrQztFQUNsQyxvQkFBb0I7RUFDcEIsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFVBQVU7QUFDWjs7QUFHQSxrQkFBa0I7O0FBQ2xCO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsV0FBVztFQUNYLFVBQVU7RUFDVixVQUFVO0VBQ1YsWUFBWTtFQUNaLDhCQUE4QjtFQUM5QiwyQkFBMkI7RUFDM0IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsU0FBUztFQUNULFNBQVM7RUFDVCxVQUFVO0VBQ1YscUJBQXFCO0VBQ3JCLDZCQUE2QjtFQUM3Qiw0QkFBNEI7QUFDOUI7O0FBR0E7RUFDRTtJQUNFLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtFQUNaO0VBQ0E7SUFDRSxVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7RUFDWjtFQUNBO0lBQ0UsU0FBUztJQUNULFNBQVM7SUFDVCxVQUFVO0VBQ1o7QUFDRjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIsV0FBVztFQUNYLFlBQVk7RUFDWixjQUFjO0VBQ2Qsd0NBQXdDO0FBQzFDOztBQUVBLCtCQUErQjs7QUFDL0I7RUFDRSxVQUFVO0VBQ1YsUUFBUTtFQUNSLFNBQVM7QUFDWDs7QUFFQSxlQUFlOztBQUNmO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixNQUFNO0VBQ04sT0FBTztFQUNQLFFBQVE7RUFDUixTQUFTO0VBQ1Qsc0JBQXNCO0VBS3RCLGVBQWU7RUFDZiw2Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixXQUFXO0VBQ1gsdUNBQXVDO0VBQ3ZDLFNBQVM7RUFDVCxXQUFXO0VBQ1gsdUJBQXVCO0VBS3ZCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsdURBQXVEO0FBQ3pEOztBQUVBOztHQUVHOztBQUVIO0VBS0UsNEJBQTRCO0VBQzVCLHNCQUFzQjtBQUN4Qjs7QUFFQSxvQkFBb0I7O0FBQ3BCO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUdBO0VBQ0U7SUFDRSxXQUFXO0lBQ1gsbUNBQW1DO0lBQ25DLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsMkNBQTJDO0lBQzNDLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsOEJBQThCO0VBQ2hDOztFQUVBO0lBQ0UsbUJBQW1CO0VBQ3JCOztFQUVBO0lBS0UsMkJBQTJCO0VBQzdCOztFQUVBO0lBQ0UsU0FBUztFQUNYOztFQUVBO0lBQ0UsV0FBVztJQUNYLFlBQVk7SUFDWixjQUFjO0VBQ2hCOztFQUVBO0lBS0UsMkJBQTJCO0VBQzdCOzs7RUFHQTtJQUNFLGVBQWU7SUFDZixjQUFjO0lBQ2Qsa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0UsYUFBYTtJQUNiLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsMkNBQTJDO0VBQzdDOzs7RUFHQTtJQUNFO01BQ0UsVUFBVTtNQUNWLGdCQUFnQjtJQUNsQjtJQUNBO01BQ0UsVUFBVTtNQUNWLGdCQUFnQjtJQUNsQjtJQUNBO01BQ0UsVUFBVTtNQUNWLGdDQUFnQztJQUNsQztFQUNGOztBQUVGOztBQUdBOzs7RUFHRTtJQUNFLHNCQUFzQjtJQUN0QixnQ0FBZ0M7SUFLaEMsMkJBQTJCO0VBQzdCO0VBQ0E7SUFDRSxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsWUFBWTtFQUNkOzs7RUFHQTtJQUNFLHNCQUFzQjtJQUN0QixxQkFBcUI7RUFDdkI7O0VBRUE7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCOztFQUVBO0lBQ0UsbUNBQW1DO0VBQ3JDOztFQUVBO0lBQ0UsZUFBZTs7RUFFakI7QUFDRjs7QUFHQTtFQUNFO0lBQ0UsTUFBTTtJQUNOLE1BQU07RUFDUjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxRQUFRO0VBQ1Y7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCO0FBQ0Y7O0FBR0E7O0VBRUU7SUFDRSxtQ0FBbUM7SUFDbkMsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixjQUFjO0VBQ2hCOztFQUVBO0lBQ0UscUJBQXFCO0VBQ3ZCO0VBQ0E7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFLRSwyQkFBMkI7RUFDN0I7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCOztBQUVGIiwiZmlsZSI6Im5hdmlnYXRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLnNpdGUtbmF2aWdhdGlvbiB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOjA7XG4gIGxlZnQ6MDtcbiAgd2lkdGg6IDEyMHB4O1xuICBoZWlnaHQ6IDEwMHZoO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1iYXNlLWNvbG9yMik7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgcGFkZGluZzogNDBweDtcbiAgLyogYmFja2dyb3VuZDogdmFyKC0tYmFzZS1jb2xvcjEpOyAqL1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuICB6LWluZGV4OiAyMDA7XG4gIG1pbi1oZWlnaHQ6IDYwMHB4O1xufVxuXG4uc2l0ZS1uYXZpZ2F0aW9uLmRhcmstbW9kZSB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWJhc2UtY29sb3IyKTtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjUpO1xufVxuXG5cbi5zaXRlLW5hdmlnYXRpb24ub3BlbiB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yKTtcbiAgY29sb3I6IHZhcigtLWJhc2UtY29sb3IxKTtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tYmFzZS1jb2xvcjEpO1xufVxuXG4ub3Blbi1zaXRlLW5hdmlnYXRpb24ge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDowO1xuICBoZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcik7XG4gIHdpZHRoOiAxMDB2dztcbiAgbWFyZ2luLWxlZnQ6IC0xMDB2dztcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQ7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHotaW5kZXg6IDE5OTtcbn1cblxuXG4ub3Blbi1zaXRlLW5hdmlnYXRpb24udmlzaWJsZSB7XG4gIG1hcmdpbi1sZWZ0OjA7XG4gIGJveC1zaGFkb3c6IDVweCAwIDIwcHggcmdiYSgwLDAsMCwwLjIpO1xufVxuLnNjcmVlbi1tdWx0aW1vZGFsLW1lbnUge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG4ubW9iaWxlLW11bHRpbW9kYWwtbWVudSB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOjA7XG4gIG1hcmdpbi1ib3R0b206IDE1MHB4O1xuICBoZWlnaHQ6IGF1dG87XG4gIHdpZHRoOiAxMDAlO1xuICB0ZXh0LWFsaWduOmNlbnRlcjtcbn1cblxuLnNpdGUtbmF2aWdhdGlvbi10aXRsZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNDBweCwgLTUwJSkgcm90YXRlKC05MGRlZyk7XG4gIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTQwcHgsIC01MCUpIHJvdGF0ZSgtOTBkZWcpO1xuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNDBweCwgLTUwJSkgcm90YXRlKC05MGRlZyk7XG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNDBweCwgLTUwJSkgcm90YXRlKC05MGRlZyk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC00MHB4LCAtNTAlKSByb3RhdGUoLTkwZGVnKTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBib3R0b206IDh2aDtcbiAgbGVmdDowO1xuICBmb250LWZhbWlseTogdmFyKC0tYmFzZS1mb250LXRpdGxlKTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtbWVkaXVtKTtcbiAgaGVpZ2h0OiAxMjBweDtcbiAgd2lkdGg6IDIwMHB4O1xuICBsaW5lLWhlaWdodDogMTIwcHg7XG59XG5cblxuLm1lbnUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgb3ZlcmZsb3c6dmlzaWJsZTtcbiAgei1pbmRleDogMTAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5tZW51OjpiZWZvcmUsIC5tZW51OjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogMDtcbiAgYm9yZGVyLWJvdHRvbTogNHB4IHNvbGlkIHZhcigtLWJhc2UtY29sb3IyKTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG59XG5cbiNzaWRlYmFyLW1lbnUub3BlbiAubWVudTo6YmVmb3JlLFxuI3NpZGViYXItbWVudS5vcGVuIC5tZW51OjphZnRlcixcbiNzaWRlYmFyLW1lbnUuZGFyay1tb2RlIC5tZW51OjpiZWZvcmUsXG4jc2lkZWJhci1tZW51LmRhcmstbW9kZSAubWVudTo6YWZ0ZXIge1xuICBib3JkZXItYm90dG9tOiA0cHggc29saWQgdmFyKC0tYmFzZS1jb2xvcjEpO1xufVxuXG4ubWVudTo6YmVmb3JlIHtcbiAgdG9wOiAwO1xuICBsZWZ0OjA7XG59XG5cbi5tZW51OjphZnRlciB7XG4gIGJvdHRvbTogMnB4O1xuICByaWdodDogMDtcbn1cblxuLm1lbnUuaG92ZXJlZmZlY3Q6aG92ZXI6OmJlZm9yZSB7XG4gIHRvcDogM3B4O1xuICBsZWZ0OiA1cHg7XG59XG5cbi5tZW51LmhvdmVyZWZmZWN0OmhvdmVyOjphZnRlciB7XG4gIGJvdHRvbTogNXB4O1xuICByaWdodDogNXB4O1xufVxuXG4ubWVudS5ob3ZlcmVmZmVjdC5vcGVuOjpiZWZvcmUge1xuICB0b3A6IDhweCFpbXBvcnRhbnQ7XG4gIGxlZnQ6IDAhaW1wb3J0YW50O1xufVxuXG4ubWVudS5ob3ZlcmVmZmVjdC5vcGVuOjphZnRlciB7XG4gIHJpZ2h0OiAwcHghaW1wb3J0YW50O1xuICBib3R0b206IDhweCFpbXBvcnRhbnQ7XG59XG5cbi5tZW51OmFjdGl2ZTo6YmVmb3JlLCAubWVudS5vcGVuOjpiZWZvcmUge1xuICB0b3A6IDhweDtcbiAgbGVmdDogMDtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAtby10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbn1cblxuLm1lbnU6YWN0aXZlOjphZnRlciwgLm1lbnUub3Blbjo6YWZ0ZXIge1xuICBib3R0b206IDhweDtcbiAgcmlnaHQ6IDFweDtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xuICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XG4gIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xuICAtby10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xufVxuXG51bC5tZW51LWl0ZW1zIHtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjAlKTtcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwJSk7XG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwJSk7XG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02MCUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIHBhZGRpbmc6IDE1dmggdmFyKC0tY29udGVudC1tYXJnaW4pO1xuICBtYXJnaW46IDAgMCAwIDEyMHB4O1xuICB3aWR0aDogdmFyKC0td2luZG93LXdpZHRoKTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbiNvcGVuLW1lbnUuYW5pbWF0ZSB7XG4gIGFuaW1hdGlvbjogZmFkZUluTWVudSBlYXNlIDEuNXM7XG59XG5cbkBrZXlmcmFtZXMgZmFkZUluTWVudSB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIG1hcmdpbi1sZWZ0OiA2MHB4O1xuICB9XG4gIDIwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICBtYXJnaW4tbGVmdDogNjBweDtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS13aW5kb3ctbWFyZ2luKTtcbiAgfVxufVxuXG4jbWVudS1jb250YWN0LWRldGFpbHMuYW5pbWF0ZSB7XG4gIGFuaW1hdGlvbjogZmFkZUluQ29udGFjdERldGFpbHMgZWFzZSAycztcbn1cblxuQGtleWZyYW1lcyBmYWRlSW5Db250YWN0RGV0YWlscyB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIDUwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbnVsLm1lbnUtaXRlbXMgbGkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW46IDh2aCAxdnc7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cblxuLmZpbGwtdGV4dC1vbi1ob3ZlciB7XG4gIGNvbG9yOiB2YXIoLS1iYXNlLWNvbG9yMSk7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1iYXNlLWZvbnQtYm9keSk7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMi44dnc7XG4gIHBhZGRpbmc6MDtcbiAgbWFyZ2luOjA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtcmVuZGVyaW5nOiBnZW9tZXRyaWNQcmVjaXNpb247XG59XG5cbnVsLm1lbnUtaXRlbXMgbGkuaG92ZXJlZmZlY3QgLmZpbGwtdGV4dC1vbi1ob3ZlcjphZnRlcntcbiAgY29udGVudDogYXR0cihkYXRhLXRleHQpO1xuICB3aWR0aDowJTtcbiAgY29sb3I6IHZhcigtLWJhc2UtY29sb3IxKTtcbiAgcG9zaXRpb246YWJzb2x1dGU7XG4gIHRvcDowO1xuICBsZWZ0OjA7XG4gIG92ZXJmbG93OmhpZGRlbjtcbiAgdHJhbnNpdGlvbjogMC44cyBlYXNlLWluLW91dDtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWJhc2UtZm9udC1ib2R5KTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAyLjh2dztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdGV4dC1yZW5kZXJpbmc6IGdlb21ldHJpY1ByZWNpc2lvbjtcbn1cbnVsLm1lbnUtaXRlbXMgbGkuaG92ZXJlZmZlY3Q6aG92ZXIgLmZpbGwtdGV4dC1vbi1ob3ZlciB7XG4gIGNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LDAuMyk7XG59XG5cblxudWwubWVudS1pdGVtcyBsaS5ob3ZlcmVmZmVjdDpob3ZlciAuZmlsbC10ZXh0LW9uLWhvdmVyOmFmdGVyIHtcbiAgd2lkdGg6MTAwJTtcbn1cblxuLmNvbnRhY3QtZGV0YWlscyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IHZhcigtLXdpbmRvdy13aWR0aCk7XG4gIG1hcmdpbi1sZWZ0OiB2YXIoLS13aW5kb3ctbWFyZ2luKTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbGVmdDowO1xuICBib3R0b206MDtcbiAgcGFkZGluZzogOHZoIHZhcigtLWNvbnRlbnQtbWFyZ2luKTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG51bC5zb2NpYWwtbWVkaWEtbGlzdCB7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIHBhZGRpbmc6IDEwcHggMDtcbiAgbWFyZ2luOjA7XG4gIHdpZHRoOiBhdXRvO1xuICBoZWlnaHQ6IGF1dG87XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1iYXNlLWZvbnQtdGl0bGUpO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBjb2xvcjogdmFyKC0tYmFzZS1jb2xvcjEpO1xuICBmb250LXNpemU6IDIycHg7XG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG59XG5cbnVsLnNvY2lhbC1tZWRpYS1saXN0IGxpIHtcbiAgbWFyZ2luOiAwIDEuNXZ3IDAgNXZ3O1xuICB3aWR0aDogYXV0bztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5cbi5lbWFpbC10ZXh0IHtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWJhc2UtZm9udC10aXRsZSk7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwLjVlbSAxLjV2dztcbiAgY29sb3I6IHZhcigtLWJhc2UtY29sb3IxKTtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbn1cblxuLmVtYWlsLXRleHQubWFpbCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC41KTtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWJhc2UtZm9udC1ib2R5KTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIGN1cnNvcjpwb2ludGVyO1xufVxuXG4uZW1haWwtdGV4dDpob3ZlciAuYXJyb3ctbGluayB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbi5lbWFpbC10ZXh0OmhvdmVyIC5hcnJvdy1saW5rLmhvdmVyZWZmZWN0IHtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIG9wYWNpdHk6IDE7XG59XG5cblxuLyogdG9nZ2xlIHN3aXRjaCAqL1xuLnRoZW1lLXRvZ2dsZS1zd2l0Y2gge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4udGhlbWUtc3RhdGUtaWNvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDI0cHg7XG4gIGhlaWdodDogMjRweDtcbiAgYmFja2dyb3VuZDogI2VlZTtcbiAgYm9yZGVyLXJhZGl1czogMjRweDtcbiAgbWFyZ2luOiAxNXB4IDhweDtcbn1cblxuLnRoZW1lLXN0YXRlLWljb246OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvcGFjaXR5OiAwO1xuICB3aWR0aDogMjRweDtcbiAgbGVmdDogMjBweDtcbiAgdG9wOiAtMjBweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1iYXNlLWNvbG9yMik7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuOHMgZWFzZTtcbiAgYm9yZGVyLXJhZGl1czogMjRweDtcbn1cblxuLnNpdGUtbmF2aWdhdGlvbi5vcGVuIC50aGVtZS1zdGF0ZS1pY29uOjphZnRlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yKTtcbn1cblxuLnRoZW1lLXN0YXRlLWljb24uZGFyay1tb2RlOjphZnRlciB7XG4gIGxlZnQ6IDdweDtcbiAgdG9wOiAtN3B4O1xuICBvcGFjaXR5OiAxO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGFuaW1hdGlvbjogbW92ZU92ZXIgMC43cyBlYXNlO1xuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxO1xufVxuXG5cbkBrZXlmcmFtZXMgbW92ZU92ZXIge1xuICAwJSB7XG4gICAgbGVmdDogMjBweDtcbiAgICB0b3A6IC0yMHB4O1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgMjAlIHtcbiAgICBsZWZ0OiAyMHB4O1xuICAgIHRvcDogLTIwcHg7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAxMDAlIHtcbiAgICBsZWZ0OiA3cHg7XG4gICAgdG9wOiAtN3B4O1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuLnN3aXRjaCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBtYXJnaW46IDAgMTBweDtcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLyogSGlkZSBkZWZhdWx0IEhUTUwgY2hlY2tib3ggKi9cbi5zd2l0Y2ggaW5wdXQge1xuICBvcGFjaXR5OiAwO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xufVxuXG4vKiBUaGUgc2xpZGVyICovXG4uc2xpZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAuNHM7XG4gIC1tb3otdHJhbnNpdGlvbjogLjRzO1xuICAtbXMtdHJhbnNpdGlvbjogLjRzO1xuICAtby10cmFuc2l0aW9uOiAuNHM7XG4gIHRyYW5zaXRpb246IC40cztcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1cHggcmdiYSgwLDAsMCwwLjMpO1xufVxuXG4uc2xpZGVyOmJlZm9yZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY29udGVudDogXCJcIjtcbiAgaGVpZ2h0OiAyMHB4O1xuICB3aWR0aDogMjBweDtcbiAgYm94LXNoYWRvdzogMHB4IDBweCA1cHggcmdiYSgwLDAsMCwwLjMpO1xuICBsZWZ0OiAwcHg7XG4gIGJvdHRvbTogMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAuNHM7XG4gIC1tb3otdHJhbnNpdGlvbjogLjRzO1xuICAtbXMtdHJhbnNpdGlvbjogLjRzO1xuICAtby10cmFuc2l0aW9uOiAuNHM7XG4gIHRyYW5zaXRpb246IC40cztcbn1cblxuaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDE1cHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xufVxuXG4vKiBpbnB1dDpmb2N1cyArIC5zbGlkZXIge1xuICBib3gtc2hhZG93OiAwIDAgMXB4ICMyMTk2RjM7XG59ICovXG5cbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOmJlZm9yZSB7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTtcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMwcHgpO1xuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTtcbiAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ0NDtcbn1cblxuLyogUm91bmRlZCBzbGlkZXJzICovXG4uc2xpZGVyLnJvdW5kIHtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbn1cblxuLnNsaWRlci5yb3VuZDpiZWZvcmUge1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG5cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTQwMHB4KSB7XG4gIC5zaXRlLW5hdmlnYXRpb24ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmc6IDQ1cHggdmFyKC0tY29udGVudC1tYXJnaW4pO1xuICAgIGhlaWdodDogMTEwcHg7XG4gICAgbWluLWhlaWdodDogNTBweDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYmFzZS1jb2xvcjIpO1xuICAgIGJvcmRlci1yaWdodDogbm9uZTtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhc2UtY29sb3IxKTtcbiAgfVxuXG4gIC50aGVtZS10b2dnbGUtc3dpdGNoIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICB9XG5cbiAgLnRoZW1lLXN0YXRlLWljb24ge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02OCUpO1xuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02OCUpO1xuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTY4JSk7XG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02OCUpO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjglKTtcbiAgfVxuXG4gIHVsLm1lbnUtaXRlbXMge1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIC5zd2l0Y2gge1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICBtYXJnaW46IDAgMTBweDtcbiAgfVxuXG4gIGlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOmJlZm9yZSB7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzBweCk7XG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzBweCk7XG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgzMHB4KTtcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzBweCk7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDMwcHgpO1xuICB9XG5cblxuICAub3Blbi1zaXRlLW5hdmlnYXRpb24ge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgICBtYXJnaW4tdG9wOiAtMTAwdmg7XG4gIH1cblxuICAub3Blbi1zaXRlLW5hdmlnYXRpb24udmlzaWJsZSB7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgfVxuXG4gIC5zaXRlLW5hdmlnYXRpb24ub3BlbiwgLnNpdGUtbmF2aWdhdGlvbi5kYXJrLW1vZGUge1xuICAgIGJvcmRlci1yaWdodDogbm9uZTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYmFzZS1jb2xvcjEpO1xuICB9XG5cblxuICBAa2V5ZnJhbWVzIGZhZGVJbk1lbnUge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICBtYXJnaW4tdG9wOiA2MHB4O1xuICAgIH1cbiAgICAyMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIG1hcmdpbi10b3A6IDYwcHg7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIG1hcmdpbi10b3A6IHZhcigtLXdpbmRvdy1tYXJnaW4pO1xuICAgIH1cbiAgfVxuXG59XG5cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAwMHB4KSB7XG5cblxuICB1bC5tZW51LWl0ZW1zIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHBhZGRpbmc6IDAgdmFyKC0tY29udGVudC1tYXJnaW4pO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgfVxuICB1bC5tZW51LWl0ZW1zIGxpIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luOiAzLjV2aCAwO1xuICB9XG5cbiAgLmZpbGwtdGV4dC1vbi1ob3ZlciB7XG4gICAgZm9udC1zaXplOiA1dnc7XG4gIH1cblxuICAuZmlsbC10ZXh0LW9uLWhvdmVyOmFmdGVyIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgI21lbnUtY29udGFjdC1kZXRhaWxzIHtcbiAgICBkaXNwbGF5Om5vbmU7XG4gIH1cblxuXG4gIC5jb250YWN0LWRldGFpbHMge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OnVuc2V0O1xuICB9XG5cbiAgdWwuc29jaWFsLW1lZGlhLWxpc3Qge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cblxuICB1bC5zb2NpYWwtbWVkaWEtbGlzdCBsaSB7XG4gICAgbWFyZ2luOiAyMHB4IDA7XG4gIH1cblxuICAuc2l0ZS1uYXZpZ2F0aW9uIHtcbiAgICBwYWRkaW5nOiA0NXB4IHZhcigtLWNvbnRlbnQtbWFyZ2luKTtcbiAgfVxuXG4gIC5lbWFpbC10ZXh0LCB1bC5zb2NpYWwtbWVkaWEtbGlzdCB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuXG4gIH1cbn1cblxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5MDBweCkge1xuICAubWVudS5ob3ZlcmVmZmVjdDpob3Zlcjo6YmVmb3JlIHtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDowO1xuICB9XG5cbiAgLm1lbnUuaG92ZXJlZmZlY3Q6aG92ZXI6OmFmdGVyIHtcbiAgICBib3R0b206IDJweDtcbiAgICByaWdodDogMDtcbiAgfVxuXG4gIC5maWxsLXRleHQtb24taG92ZXIge1xuICAgIGZvbnQtc2l6ZTogNnZ3O1xuICB9XG59XG5cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzAwcHgpIHtcblxuICAuc2l0ZS1uYXZpZ2F0aW9uIHtcbiAgICBwYWRkaW5nOiA0NHB4IHZhcigtLWNvbnRlbnQtbWFyZ2luKTtcbiAgICBoZWlnaHQ6IDkwcHg7XG4gICAgbWFyZ2luLXRvcDogLTE1cHg7XG4gICAgcG9zaXRpb246Zml4ZWQ7XG4gIH1cblxuICAubW9iaWxlLW11bHRpbW9kYWwtbWVudSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB9XG4gIC5zY3JlZW4tbXVsdGltb2RhbC1tZW51IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgdWwubWVudS1pdGVtcyB7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTU1JSk7XG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTU1JSk7XG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTUlKTtcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTU1JSk7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01NSUpO1xuICB9XG5cbiAgLmZpbGwtdGV4dC1vbi1ob3ZlciB7XG4gICAgZm9udC1zaXplOiA3dnc7XG4gIH1cblxufVxuIl19 */", "ul.social-media-list[_ngcontent-%COMP%] {\n  color: var(--base-color2);\n  z-index: 100;\n}\n\n\n.page-section.darkMode[_ngcontent-%COMP%]   ul.social-media-list[_ngcontent-%COMP%] {\n  color: var(--base-color1);\n}\n\n\n.contact-details[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-left: 0;\n  padding: 8vh var(--content-margin);\n}\n\n\n.email-text[_ngcontent-%COMP%] {\n  margin: 0.5em 0;\n  color: var(--base-color2);\n}\n\n\n.page-section.darkMode[_ngcontent-%COMP%]   .email-text[_ngcontent-%COMP%] {\n  color: var(--base-color1);\n}\n\n\n.email-text.mail[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n\n.page-section.darkMode[_ngcontent-%COMP%]   .email-text.mail[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n\n.arrow-link[_ngcontent-%COMP%] {\n  border-top: 2px solid var(--base-color2);\n}\n\n\n.arrow-link[_ngcontent-%COMP%]:after {\n  border-right: 2px solid var(--base-color2);\n  border-top: 2px solid var(--base-color2);\n}\n\n\n.page-section.darkMode[_ngcontent-%COMP%]   .arrow-link[_ngcontent-%COMP%] {\n  border-top: 2px solid var(--base-color1);\n}\n\n\n.page-section.darkMode[_ngcontent-%COMP%]   .arrow-link[_ngcontent-%COMP%]:after {\n  border-right: 2px solid var(--base-color1);\n  border-top: 2px solid var(--base-color1);\n}\n\n\n@media screen and (max-width: 1400px) {\n\n  .vertical-aligned-textblock[_ngcontent-%COMP%] {\n    top:80px !important;\n    transform: none !important;\n    margin: 0 var(--content-margin) !important;\n  }\n\n  .page-section[_ngcontent-%COMP%], #svgBg[_ngcontent-%COMP%] {\n    height: calc(100vh - 120px);\n  }\n\n  #svgBg[_ngcontent-%COMP%] {\n    position: absolute;\n  }\n\n  .contact-details[_ngcontent-%COMP%] {\n    position: relative;\n    bottom: auto;\n    margin-top: 160px;\n    flex-direction: column;\n    font-size: 18px;\n    margin-top: 20px;\n  }\n}\n\n\n@media screen and (max-width: 1200px) {\n\n\n  .vertical-aligned-textblock[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n}\n\n\n@media screen and (max-width: 1000px) {\n\n\n\n  #svgBg[_ngcontent-%COMP%] {\n    position: absolute!important;\n    bottom: 0;\n    top: auto;\n  }\n\n  .page-section[_ngcontent-%COMP%], #svgBg[_ngcontent-%COMP%] {\n    height: calc(100vh - 90px);\n  }\n\n  .page-section.start[_ngcontent-%COMP%] {\n    margin-top: var(--top-margin-menu);\n    padding: 80px 0 0 0;\n  }\n\n  .vertical-aligned-textblock[_ngcontent-%COMP%] {\n    top: 40px !important;\n  }\n\n\n}\n\n\n@media screen and (max-width: 800px) {\n\n  #svgBg[_ngcontent-%COMP%] {\n    height: 120vw;\n    position: relative!important;\n    margin-top: -200px;\n  }\n\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2Q7OztBQUdBO0VBQ0UseUJBQXlCO0FBQzNCOzs7QUFFQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2Qsa0NBQWtDO0FBQ3BDOzs7QUFFQTtFQUNFLGVBQWU7RUFDZix5QkFBeUI7QUFDM0I7OztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7O0FBRUE7RUFDRSwrQkFBK0I7QUFDakM7OztBQUVBO0VBQ0Usd0NBQXdDO0FBQzFDOzs7QUFHQTtFQUNFLDBDQUEwQztFQUMxQyx3Q0FBd0M7QUFDMUM7OztBQUdBO0VBQ0Usd0NBQXdDO0FBQzFDOzs7QUFHQTtFQUNFLDBDQUEwQztFQUMxQyx3Q0FBd0M7QUFDMUM7OztBQU1BOztFQUVFO0lBQ0UsbUJBQW1CO0lBS25CLDBCQUEwQjtJQUMxQiwwQ0FBMEM7RUFDNUM7O0VBRUE7SUFDRSwyQkFBMkI7RUFDN0I7O0VBRUE7SUFDRSxrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLGdCQUFnQjtFQUNsQjtBQUNGOzs7QUFFQTs7O0VBR0U7SUFDRSxVQUFVO0VBQ1o7QUFDRjs7O0FBRUE7Ozs7RUFJRTtJQUNFLDRCQUE0QjtJQUM1QixTQUFTO0lBQ1QsU0FBUztFQUNYOztFQUVBO0lBQ0UsMEJBQTBCO0VBQzVCOztFQUVBO0lBQ0Usa0NBQWtDO0lBQ2xDLG1CQUFtQjtFQUNyQjs7RUFFQTtJQUNFLG9CQUFvQjtFQUN0Qjs7O0FBR0Y7OztBQUNBOztFQUVFO0lBQ0UsYUFBYTtJQUNiLDRCQUE0QjtJQUM1QixrQkFBa0I7RUFDcEI7O0FBRUYiLCJmaWxlIjoiY29udGFjdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsidWwuc29jaWFsLW1lZGlhLWxpc3Qge1xuICBjb2xvcjogdmFyKC0tYmFzZS1jb2xvcjIpO1xuICB6LWluZGV4OiAxMDA7XG59XG5cblxuLnBhZ2Utc2VjdGlvbi5kYXJrTW9kZSB1bC5zb2NpYWwtbWVkaWEtbGlzdCB7XG4gIGNvbG9yOiB2YXIoLS1iYXNlLWNvbG9yMSk7XG59XG5cbi5jb250YWN0LWRldGFpbHMge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWxlZnQ6IDA7XG4gIHBhZGRpbmc6IDh2aCB2YXIoLS1jb250ZW50LW1hcmdpbik7XG59XG5cbi5lbWFpbC10ZXh0IHtcbiAgbWFyZ2luOiAwLjVlbSAwO1xuICBjb2xvcjogdmFyKC0tYmFzZS1jb2xvcjIpO1xufVxuXG4ucGFnZS1zZWN0aW9uLmRhcmtNb2RlIC5lbWFpbC10ZXh0IHtcbiAgY29sb3I6IHZhcigtLWJhc2UtY29sb3IxKTtcbn1cblxuLmVtYWlsLXRleHQubWFpbCB7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG59XG5cbi5wYWdlLXNlY3Rpb24uZGFya01vZGUgLmVtYWlsLXRleHQubWFpbCB7XG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XG59XG5cbi5hcnJvdy1saW5rIHtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHZhcigtLWJhc2UtY29sb3IyKTtcbn1cblxuXG4uYXJyb3ctbGluazphZnRlciB7XG4gIGJvcmRlci1yaWdodDogMnB4IHNvbGlkIHZhcigtLWJhc2UtY29sb3IyKTtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHZhcigtLWJhc2UtY29sb3IyKTtcbn1cblxuXG4ucGFnZS1zZWN0aW9uLmRhcmtNb2RlIC5hcnJvdy1saW5rIHtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHZhcigtLWJhc2UtY29sb3IxKTtcbn1cblxuXG4ucGFnZS1zZWN0aW9uLmRhcmtNb2RlIC5hcnJvdy1saW5rOmFmdGVyIHtcbiAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgdmFyKC0tYmFzZS1jb2xvcjEpO1xuICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0tYmFzZS1jb2xvcjEpO1xufVxuXG5cblxuXG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE0MDBweCkge1xuXG4gIC52ZXJ0aWNhbC1hbGlnbmVkLXRleHRibG9jayB7XG4gICAgdG9wOjgwcHggIWltcG9ydGFudDtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50O1xuICAgIC1tb3otdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XG4gICAgLW8tdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XG4gICAgLW1zLXRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50O1xuICAgIHRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50O1xuICAgIG1hcmdpbjogMCB2YXIoLS1jb250ZW50LW1hcmdpbikgIWltcG9ydGFudDtcbiAgfVxuXG4gIC5wYWdlLXNlY3Rpb24sICNzdmdCZyB7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTIwcHgpO1xuICB9XG5cbiAgI3N2Z0JnIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIH1cblxuICAuY29udGFjdC1kZXRhaWxzIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYm90dG9tOiBhdXRvO1xuICAgIG1hcmdpbi10b3A6IDE2MHB4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTIwMHB4KSB7XG5cblxuICAudmVydGljYWwtYWxpZ25lZC10ZXh0YmxvY2sge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAwMHB4KSB7XG5cblxuXG4gICNzdmdCZyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlIWltcG9ydGFudDtcbiAgICBib3R0b206IDA7XG4gICAgdG9wOiBhdXRvO1xuICB9XG5cbiAgLnBhZ2Utc2VjdGlvbiwgI3N2Z0JnIHtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA5MHB4KTtcbiAgfVxuXG4gIC5wYWdlLXNlY3Rpb24uc3RhcnQge1xuICAgIG1hcmdpbi10b3A6IHZhcigtLXRvcC1tYXJnaW4tbWVudSk7XG4gICAgcGFkZGluZzogODBweCAwIDAgMDtcbiAgfVxuXG4gIC52ZXJ0aWNhbC1hbGlnbmVkLXRleHRibG9jayB7XG4gICAgdG9wOiA0MHB4ICFpbXBvcnRhbnQ7XG4gIH1cblxuXG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4MDBweCkge1xuXG4gICNzdmdCZyB7XG4gICAgaGVpZ2h0OiAxMjB2dztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmUhaW1wb3J0YW50O1xuICAgIG1hcmdpbi10b3A6IC0yMDBweDtcbiAgfVxuXG59XG5cblxuXG4iXX0= */"] });


/***/ }),

/***/ "LmEr":
/*!*******************************************************!*\
  !*** ./src/app/components/footer/footer.component.ts ***!
  \*******************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_content_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/content.service */ "NBun");
/* harmony import */ var src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/multimodal.service */ "bTnw");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var ng_inline_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-inline-svg */ "e8Ap");






const _c0 = function (a0) { return { hovereffect: a0 }; };
function FooterComponent_li_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_li_9_Template_div_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const item_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.loadPage(item_r1 == null ? null : item_r1.url); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("alt", "visit my ", item_r1.name, " profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, ctx_r0.config.modalities[1].active))("inlineSVG", item_r1.icon);
} }
const _c1 = function (a0) { return { haptic: a0 }; };
class FooterComponent {
    constructor(route, contentService, multimodalService) {
        this.route = route;
        this.contentService = contentService;
        this.multimodalService = multimodalService;
        this.contact_info = null;
        this.current_year = new Date().getFullYear();
        this.config = this.multimodalService.config;
    }
    loadPage(url) {
        if (this.multimodalService.config.modalities.filter(m => m.name === 'audio')[0].active) {
            this.multimodalService.playAudioClick();
        }
        if (url) {
            setTimeout(() => window.open(url, '_blank'), 500);
        }
    }
    ngOnInit() {
        this.contentService.getContactInfo().subscribe(res => {
            this.contact_info = res;
        });
    }
    linkTo(url) {
        this.multimodalService.playAudioClick();
        this.multimodalService.playHapticButtonClick(150);
        window.open(url);
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_content_service__WEBPACK_IMPORTED_MODULE_2__["ContentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_3__["MultimodalService"])); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 12, vars: 8, consts: [[1, "page-section", "footer", 3, "ngClass"], [1, "footer-title"], [1, "address", 3, "click"], [1, "email", "buttonEl", 3, "click"], [1, "social-media"], [1, "social-media-list", "footer-list"], [4, "ngFor", "ngForOf"], [1, "copyright"], [1, "social-media-icon", 3, "ngClass", "inlineSVG", "alt", "click"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Contact me");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_div_click_3_listener() { return ctx.loadPage(ctx.contact_info == null ? null : ctx.contact_info.address_link); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FooterComponent_Template_div_click_5_listener() { return ctx.linkTo("mailto:" + (ctx.contact_info == null ? null : ctx.contact_info.email)); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ul", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, FooterComponent_li_9_Template, 2, 5, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](6, _c1, ctx.config.modalities[0].active));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.contact_info == null ? null : ctx.contact_info.address);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.contact_info == null ? null : ctx.contact_info.email);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.contact_info == null ? null : ctx.contact_info.social_media);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", ctx.current_year, " \u00A9 ", ctx.contact_info == null ? null : ctx.contact_info.rights, "");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], ng_inline_svg__WEBPACK_IMPORTED_MODULE_5__["InlineSVGDirective"]], styles: ["img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n}\n\nul[_ngcontent-%COMP%] {\n  list-style-type: none;\n  margin: 0;\n  padding:0;\n}\n\n.footer[_ngcontent-%COMP%] {\n  height: auto;\n  width: var(--window-width);\n  background-color: var(--color);\n  \n  box-sizing: border-box;\n  padding: 10vh var(--content-margin);\n  margin-left: var(--window-margin);\n  color: #fff;\n}\n\n.footer.haptic[_ngcontent-%COMP%] {\n  scroll-snap-align:start;\n  \n}\n\n.footer-title[_ngcontent-%COMP%] {\n  font-family: 'Poppins', sans-serif;\n  font-size: 3.3vw;\n  font-weight: 500;\n  padding-bottom: 4vh;\n}\n\n.address[_ngcontent-%COMP%], .email[_ngcontent-%COMP%] {\n  font-family: 'Lora', serif;\n  font-size: 1.3vw;\n  padding: 1vh 0;\n}\n\n.copyright[_ngcontent-%COMP%] {\n  font-family: 'Lora', serif;\n  width: 100%;\n  font-size: 0.95vw;\n  text-align: right;\n  margin-top: 10vw;\n}\n\n@media screen and (max-width: 1400px) {\n  .footer-title[_ngcontent-%COMP%] {\n    font-size: 4.5vw;\n    padding-bottom: 4vh;\n  }\n\n  .address[_ngcontent-%COMP%], .email[_ngcontent-%COMP%] {\n    font-size: 1.8vw;\n    padding: 1vh 0;\n  }\n\n  .copyright[_ngcontent-%COMP%] {\n    font-size: 1.5vw;\n    margin-top: 5vh;\n  }\n\n}\n\n@media screen and (max-width: 1200px) {\n  .footer-title[_ngcontent-%COMP%] {\n    font-size: 4.5vw;\n    padding-bottom: 4vh;\n  }\n\n  .copyright[_ngcontent-%COMP%] {\n    font-size: 1.5vw;\n    margin-top: 5vh;\n  }\n\n}\n\n@media screen and (max-width: 1000px) {\n  .footer-title[_ngcontent-%COMP%] {\n    font-size: 36px;\n    padding-bottom: 4vh;\n  }\n\n  .address[_ngcontent-%COMP%], .email[_ngcontent-%COMP%] {\n    font-size: 20px;\n    padding: 1vh 0;\n  }\n\n  .copyright[_ngcontent-%COMP%] {\n    font-size: 16px;\n    margin-top: 10vh;\n  }\n\n}\n\n@media screen and (max-width: 700px) {\n  .footer-title[_ngcontent-%COMP%] {\n    font-size: 32px;\n  }\n\n  .address[_ngcontent-%COMP%], .email[_ngcontent-%COMP%] {\n    font-size: 17px;\n    line-height: 26px;\n  }\n\n  .copyright[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixTQUFTO0VBQ1QsU0FBUztBQUNYOztBQUVBO0VBQ0UsWUFBWTtFQUNaLDBCQUEwQjtFQUMxQiw4QkFBOEI7RUFDOUI7OztnQ0FHOEI7RUFDOUIsc0JBQXNCO0VBQ3RCLG1DQUFtQztFQUNuQyxpQ0FBaUM7RUFDakMsV0FBVztBQUNiOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGVBQWU7QUFDakI7O0FBSUE7RUFDRSxrQ0FBa0M7RUFDbEMsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsZ0JBQWdCO0FBQ2xCOztBQUlBO0VBQ0U7SUFDRSxnQkFBZ0I7SUFDaEIsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsZ0JBQWdCO0lBQ2hCLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSxnQkFBZ0I7SUFDaEIsZUFBZTtFQUNqQjs7QUFFRjs7QUFHQTtFQUNFO0lBQ0UsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtFQUNyQjs7RUFFQTtJQUNFLGdCQUFnQjtJQUNoQixlQUFlO0VBQ2pCOztBQUVGOztBQUdBO0VBQ0U7SUFDRSxlQUFlO0lBQ2YsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsZUFBZTtJQUNmLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSxlQUFlO0lBQ2YsZ0JBQWdCO0VBQ2xCOztBQUVGOztBQUlBO0VBQ0U7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtJQUNmLGlCQUFpQjtFQUNuQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7QUFDRiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImltZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbnVsIHtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6MDtcbn1cblxuLmZvb3RlciB7XG4gIGhlaWdodDogYXV0bztcbiAgd2lkdGg6IHZhcigtLXdpbmRvdy13aWR0aCk7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yKTtcbiAgLyogYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltYWdlcy9mb290ZXItYmcuc3ZnJyk7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb24teDogMTAwJTsgKi9cbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgcGFkZGluZzogMTB2aCB2YXIoLS1jb250ZW50LW1hcmdpbik7XG4gIG1hcmdpbi1sZWZ0OiB2YXIoLS13aW5kb3ctbWFyZ2luKTtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi5mb290ZXIuaGFwdGljIHtcbiAgc2Nyb2xsLXNuYXAtYWxpZ246c3RhcnQ7XG4gIC8qIHRvcDogMTBweDsgKi9cbn1cblxuXG5cbi5mb290ZXItdGl0bGUge1xuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDMuM3Z3O1xuICBmb250LXdlaWdodDogNTAwO1xuICBwYWRkaW5nLWJvdHRvbTogNHZoO1xufVxuXG4uYWRkcmVzcywgLmVtYWlsIHtcbiAgZm9udC1mYW1pbHk6ICdMb3JhJywgc2VyaWY7XG4gIGZvbnQtc2l6ZTogMS4zdnc7XG4gIHBhZGRpbmc6IDF2aCAwO1xufVxuXG4uY29weXJpZ2h0IHtcbiAgZm9udC1mYW1pbHk6ICdMb3JhJywgc2VyaWY7XG4gIHdpZHRoOiAxMDAlO1xuICBmb250LXNpemU6IDAuOTV2dztcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIG1hcmdpbi10b3A6IDEwdnc7XG59XG5cblxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxNDAwcHgpIHtcbiAgLmZvb3Rlci10aXRsZSB7XG4gICAgZm9udC1zaXplOiA0LjV2dztcbiAgICBwYWRkaW5nLWJvdHRvbTogNHZoO1xuICB9XG5cbiAgLmFkZHJlc3MsIC5lbWFpbCB7XG4gICAgZm9udC1zaXplOiAxLjh2dztcbiAgICBwYWRkaW5nOiAxdmggMDtcbiAgfVxuXG4gIC5jb3B5cmlnaHQge1xuICAgIGZvbnQtc2l6ZTogMS41dnc7XG4gICAgbWFyZ2luLXRvcDogNXZoO1xuICB9XG5cbn1cblxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMjAwcHgpIHtcbiAgLmZvb3Rlci10aXRsZSB7XG4gICAgZm9udC1zaXplOiA0LjV2dztcbiAgICBwYWRkaW5nLWJvdHRvbTogNHZoO1xuICB9XG5cbiAgLmNvcHlyaWdodCB7XG4gICAgZm9udC1zaXplOiAxLjV2dztcbiAgICBtYXJnaW4tdG9wOiA1dmg7XG4gIH1cblxufVxuXG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEwMDBweCkge1xuICAuZm9vdGVyLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDM2cHg7XG4gICAgcGFkZGluZy1ib3R0b206IDR2aDtcbiAgfVxuXG4gIC5hZGRyZXNzLCAuZW1haWwge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBwYWRkaW5nOiAxdmggMDtcbiAgfVxuXG4gIC5jb3B5cmlnaHQge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBtYXJnaW4tdG9wOiAxMHZoO1xuICB9XG5cbn1cblxuXG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KSB7XG4gIC5mb290ZXItdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMzJweDtcbiAgfVxuXG4gIC5hZGRyZXNzLCAuZW1haWwge1xuICAgIGZvbnQtc2l6ZTogMTdweDtcbiAgICBsaW5lLWhlaWdodDogMjZweDtcbiAgfVxuXG4gIC5jb3B5cmlnaHQge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxufVxuIl19 */"] });


/***/ }),

/***/ "M4Nl":
/*!***********************************************!*\
  !*** ./src/app/models/configuration.model.ts ***!
  \***********************************************/
/*! exports provided: Modality, Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modality", function() { return Modality; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
class Modality {
    constructor(name, icon, active_icon, active, accelerator) {
        this.name = null;
        this.icon = null;
        this.active_icon = null;
        this.active = null;
        this.accelerator = null;
        this.name = name;
        this.icon = icon;
        this.active_icon = active_icon;
        this.active = active;
        this.accelerator = accelerator;
    }
}
class Config {
    constructor() {
        this.modalities = [
            new Modality('haptic', '/assets/images/haptic.svg', '/assets/images/haptic-active.svg', true, 'h'),
            new Modality('vision', '/assets/images/visual.svg', '/assets/images/visual-active.svg', true, 'v'),
            new Modality('audio', '/assets/images/audio.svg', '/assets/images/audio-active.svg', false, 'm'),
            new Modality('speech', '/assets/images/voice.svg', '/assets/images/voice-active.svg', false, 's')
        ];
        this.theme = 'light-mode';
        this.scrollImageVisible = true;
        this.inputActive = false;
        this.inputFocus = false;
        this.activePage = 'welcome';
    }
}


/***/ }),

/***/ "NBun":
/*!*********************************************!*\
  !*** ./src/app/services/content.service.ts ***!
  \*********************************************/
/*! exports provided: ContentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentService", function() { return ContentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");


class ContentService {
    constructor(http) {
        this.http = http;
    }
    getScholarPublications() {
        const url = '/assets/data/publications.json';
        return this.http.get(url);
    }
    getPublications() {
        const url = '/assets/data/publications-addition.json';
        return this.http.get(url);
    }
    getSelectedProjects() {
        const url = '/assets/data/front-page.json';
        return this.http.get(url);
    }
    getCourses() {
        const url = '/assets/data/courses.json';
        return this.http.get(url);
    }
    getContactInfo() {
        const url = '/assets/data/contact-info.json';
        return this.http.get(url);
    }
}
ContentService.ɵfac = function ContentService_Factory(t) { return new (t || ContentService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
ContentService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ContentService, factory: ContentService.ɵfac });


/***/ }),

/***/ "QUYs":
/*!*****************************************************!*\
  !*** ./src/app/services/drawing-contact.service.ts ***!
  \*****************************************************/
/*! exports provided: DrawingContactService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawingContactService", function() { return DrawingContactService; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class DrawingContactService {
    constructor() {
        this.rotating = false;
        this.rotation_angle = -40;
        this.animating_mobile_hand = false;
        this.playClick = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.playMechanicalClick = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.hapticFeedback = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    playHapticFeedback(value) {
        this.hapticFeedback.next(value);
    }
    draw() {
        d3__WEBPACK_IMPORTED_MODULE_0__["selectAll"]('#svgContact').remove();
        this.svgContact = d3__WEBPACK_IMPORTED_MODULE_0__["select"]('#svgBg')
            .append('svg')
            .attr('width', window.innerWidth)
            .attr('height', () => window.innerWidth < window.innerHeight ? window.innerWidth * 1.2 : window.innerHeight)
            .attr('id', 'svgContact');
        if (window.innerWidth > 1000) {
            this.drawKnob();
            this.drawHandKnob();
        }
        if (window.innerWidth <= 1000 || window.innerWidth >= 1600) {
            this.drawMobile();
            this.drawMobileHand();
        }
    }
    animateKnob(i) {
        this.svgContact.select('#knob_group')
            .attr('transform', 'translate(' + (this.knob_image_offsetX + (this.knob_image_width * 0.324)) + ', ' + (this.knob_image_offsetY + (this.knob_image_height * 0.5)) + '), rotate(' + this.rotation_angle + ')')
            .transition()
            .duration(300)
            .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeBounceInOut"])
            .attr('transform', 'translate(' + (this.knob_image_offsetX + (this.knob_image_width * 0.324)) + ', ' + (this.knob_image_offsetY + (this.knob_image_height * 0.5)) + '), rotate(' + (this.rotation_angle + 20) + ')');
        this.svgContact.select('#forcefeedback')
            .style('stroke', '#8f8f8e')
            .attr('stroke-dasharray', this.totalLength_path_forcefeedback + ' ' + this.totalLength_path_forcefeedback)
            .attr('stroke-dashoffset', this.totalLength_path_forcefeedback / 9 * (9 - i + 1))
            .transition()
            .duration(300)
            .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeBounceInOut"])
            .attr('stroke-dashoffset', this.totalLength_path_forcefeedback / 9 * (9 - i));
        this.playMechanicalClick.next();
        this.playHapticFeedback(100);
        this.rotation_angle += 20;
    }
    animateHand() {
        this.svgContact.select('#hand_knob')
            .attr('transform', 'translate(200,0), rotate(4)')
            .transition()
            .duration(300)
            .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeBounceInOut"])
            .attr('transform', 'translate(200,0), rotate(-2)');
    }
    drawKnob() {
        this.knob_image_width = window.innerWidth * 0.285;
        this.knob_image_offsetX = window.innerWidth * 0.68;
        this.knob_image_offsetY = window.innerHeight * 0.1;
        if (window.innerWidth < 1200) {
            this.knob_image_width = window.innerWidth * 0.48;
            this.knob_image_offsetX = window.innerWidth * 0.58;
            this.knob_image_offsetY = window.innerHeight * 0.5 - (this.knob_image_width / 2);
        }
        else if (window.innerWidth < 1400) {
            this.knob_image_width = window.innerWidth * 0.45;
            this.knob_image_offsetX = window.innerWidth * 0.55;
            this.knob_image_offsetY = window.innerHeight * 0.5 - (this.knob_image_width / 2);
        }
        else if (window.innerWidth < 1600) {
            this.knob_image_width = window.innerWidth * 0.38;
            this.knob_image_offsetX = window.innerWidth * 0.58;
            this.knob_image_offsetY = window.innerHeight * 0.5 - (this.knob_image_width / 2);
        }
        this.knob_image_height = this.knob_image_width * (330 / 512);
        this.knob_scale = this.knob_image_width / 512;
        const group = this.svgContact.append('g')
            .attr('id', 'knob_group')
            .attr('transform', 'translate(' + (this.knob_image_offsetX + (this.knob_image_width * 0.324)) + ', ' + (this.knob_image_offsetY + (this.knob_image_height * 0.5)) + '), rotate(' + this.rotation_angle + ')')
            .on('mouseenter', () => {
            this.svgContact.select('#hand_knob').attr('transform', 'translate(200,0), rotate(4)');
            if (!this.rotating) {
                this.rotating = true;
                for (let i = 0; i < 9; i++) {
                    setTimeout(() => {
                        this.animateKnob(i + 1);
                        this.animateHand();
                    }, (400 * i));
                }
                setTimeout(() => {
                    this.svgContact.select('#forcefeedback').style('stroke', 'transparent');
                    this.rotating = false;
                    this.svgContact.select('#hand_knob').attr('transform', 'translate(200,0), rotate(0)');
                }, 3600);
            }
        });
        group.append('circle')
            .attr('r', this.knob_image_height * 0.285)
            .attr('cx', 0)
            .attr('cy', 0)
            .style('fill', '#9fddf9');
        const r = this.knob_image_height * 0.35;
        const data = [
            [
                Math.sin(0) * r,
                Math.cos(0) * r
            ],
            [
                Math.sin(Math.PI / 3 * 2) * r,
                Math.cos(Math.PI / 3 * 2) * r
            ],
            [
                Math.sin(Math.PI / 3 * 4) * r,
                Math.cos(Math.PI / 3 * 4) * r
            ]
        ];
        group.selectAll('polygon')
            .data(data)
            .enter()
            .append('polygon')
            .attr('points', (d) => data)
            .style('fill', '#f27fb2');
        const path = 'M192.1,322.7c-8.5,1.4-19.5-29.4-27.9-29.4c-8.6-0.1-20.1,30.5-28.3,29c-8.4-1.6-8.2-34.3-16.1-37.2c-8-3-29.3,21.8-36.5,17.5c-7.3-4.4,4.1-34.9-2.4-40.5c-6.4-5.5-34.9,10.6-40.4,4c-5.3-6.5,15.7-31.4,11.6-38.9c-4.2-7.3-36.4-2-39.3-10.1C10,209.2,38.4,193,37,184.5S3.4,169.9,3.5,161.6c0.1-8.6,32.3-14.1,33.9-22.4c1.6-8.4-26.5-25-23.6-33c3-8,35.1-2.1,39.4-9.4c4.4-7.3-16.4-32.6-10.9-39S76,67.9,82.6,62.5c6.5-5.3-4.4-36.2,3.1-40.4c7.3-4.2,28.1,21,36.2,18.2c7.9-2.8,8.2-35.4,16.7-36.9';
        const group2 = this.svgContact.append('g')
            .attr('transform', 'translate(' + this.knob_image_offsetX + ', ' + this.knob_image_offsetY + '), scale(' + this.knob_scale + ')');
        const forcefeedback = group2.append('path')
            .attr('d', path)
            .attr('id', 'forcefeedback')
            .style('fill', 'none')
            .style('stroke', 'transparent') //#8f8f8e
            .style('stroke-width', this.knob_image_width * 0.016);
        this.totalLength_path_forcefeedback = forcefeedback.node().getTotalLength();
    }
    drawHandKnob() {
        const group = this.svgContact.append('g')
            .attr('id', 'hand_knob_group')
            .attr('transform', 'translate(' + (this.knob_image_offsetX + (this.knob_image_width * 0.02)) + ', ' + (this.knob_image_offsetY - (this.knob_image_height * 0.02)) + '), scale(' + this.knob_scale + ')');
        group.append('rect')
            .attr('x', 317)
            .attr('y', 164)
            .attr('width', 450)
            .attr('height', 60)
            .style('fill', '#ccc');
        const path = 'M74.8,316H44v-12.1c0-15.1,12.3-27.5,27.5-27.5h3.4c14.2,0,25.6-11.5,25.6-25.6V65.2c0-14.2-11.5-25.6-25.6-25.6H25.4C11.3,39.6,0,28.2,0,14.2V0h74.9c36,0,65.2,29.2,65.2,65.2v185.5C140,286.8,110.8,316,74.8,316z';
        group.append('path')
            .attr('id', 'hand_knob')
            .attr('d', path)
            .style('fill', '#eee')
            .attr('transform', 'translate(200,0), rotate(0)')
            .attr('transform-origin', '0px 194px');
    }
    drawMobile() {
        this.mobile_image_width = window.innerWidth * 0.25;
        this.mobile_image_offsetX = window.innerWidth * 0.38;
        if (window.innerWidth < 800) {
            this.mobile_image_width = window.innerWidth * 0.7;
            this.mobile_image_offsetX = window.innerWidth * 0.15;
        }
        else if (window.innerWidth < 1000) {
            this.mobile_image_width = window.innerWidth * 0.5;
            this.mobile_image_offsetX = window.innerWidth * 0.3;
        }
        else if (window.innerWidth < 1400) {
            this.mobile_image_width = window.innerWidth * 0.38;
            this.mobile_image_offsetX = window.innerWidth * 0.36;
        }
        this.mobile_image_height = this.mobile_image_width * (660 / 528);
        this.mobile_image_offsetY = window.innerHeight - this.mobile_image_height;
        if (window.innerWidth < 1000) {
            this.mobile_image_offsetY = (window.innerWidth * 1.2) - this.mobile_image_height;
        }
        else if (window.innerWidth < 1400) {
            this.mobile_image_offsetY = window.innerHeight - this.mobile_image_height - 90;
        }
        this.mobile_scale = this.mobile_image_width / 528;
        const group = this.svgContact.append('g')
            .attr('id', 'mobile_group')
            .attr('transform', 'translate(' + (this.mobile_image_offsetX) + ', ' + (this.mobile_image_offsetY) + ')');
        group.append('rect')
            .attr('x', this.mobile_image_width * 0.607)
            .attr('y', 0)
            .attr('width', this.mobile_image_width * 0.31)
            .attr('height', this.mobile_image_height * 0.5)
            .style('opacity', 0.7)
            .style('fill', '#9fddf9');
        group.append('circle')
            .attr('cx', this.mobile_image_width * 0.77)
            .attr('cy', this.mobile_image_height * 0.445)
            .attr('r', this.mobile_image_width * 0.0507)
            .style('fill', '#f27fb2');
        group.append('rect')
            .attr('x', this.mobile_image_width * 0.896)
            .attr('y', this.mobile_image_height * 0.0378)
            .attr('width', this.mobile_image_width * 0.0442)
            .attr('height', this.mobile_image_height * 0.505)
            .style('fill', '#832990');
        group.append('circle')
            .attr('cx', this.mobile_image_width * 0.943)
            .attr('cy', this.mobile_image_height * 0.445)
            .attr('r', this.mobile_image_width * 0.0625)
            .style('fill', '#f27fb2')
            .style('mix-blend-mode', 'color-dodge');
        const zigZagWidth = this.mobile_image_width * 0.05078;
        const zigZagHeight = this.mobile_image_height * 0.351;
        const data = 'M0,0L' + zigZagWidth + ',' + (zigZagHeight / 6) + 'L0,' + ((zigZagHeight / 6) * 2) + 'L' + zigZagWidth + ',' + ((zigZagHeight / 6) * 3) + 'L0' + ',' + ((zigZagHeight / 6) * 4) + 'L' +
            zigZagWidth + ',' + ((zigZagHeight / 6) * 5) + 'L0' + ',' + (zigZagHeight);
        const data2 = 'M' + zigZagWidth + ',0L0,' + (zigZagHeight / 6) + 'L' + zigZagWidth + ',' + ((zigZagHeight / 6) * 2) + 'L0,' + ((zigZagHeight / 6) * 3) + 'L' + zigZagWidth + ',' + ((zigZagHeight / 6) * 4) + 'L0,' +
            ((zigZagHeight / 6) * 5) + 'L' + zigZagWidth + ',' + (zigZagHeight);
        group.append('path')
            .attr('d', data)
            .attr('class', 'zigzag')
            .attr('stroke', 'transparent') //#8f8f8e
            .attr('stroke-width', this.mobile_image_width * 0.0175)
            .attr('fill', 'none')
            .attr('transform', 'translate(' + (this.mobile_image_width * 0.818) + ', ' + (this.mobile_image_height * 0.06) + ')');
        group.append('path')
            .attr('d', data2)
            .attr('class', 'zigzag')
            .attr('stroke', 'transparent') //#8f8f8e
            .attr('stroke-width', this.mobile_image_width * 0.0175)
            .attr('fill', 'none')
            .attr('transform', 'translate(' + (this.mobile_image_width * 0.97) + ', ' + (this.mobile_image_height * 0.06) + ')');
    }
    shakeMobile() {
        this.svgContact.select('#mobile_group')
            .attr('transform', 'translate(' + (this.mobile_image_offsetX) + ', ' + (this.mobile_image_offsetY) + ')')
            .transition()
            .duration(80)
            .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeBounceInOut"])
            .attr('transform', 'translate(' + (this.mobile_image_offsetX + 10) + ', ' + (this.mobile_image_offsetY) + ')');
    }
    drawMobileHand() {
        const group = this.svgContact.append('g')
            .attr('id', 'mobile_hand_group')
            .attr('transform', 'translate(' + (this.mobile_image_offsetX) + ', ' + (this.mobile_image_offsetY + (this.mobile_image_height * 0.409)) + '), scale(' + this.mobile_scale + ')')
            .on('mouseenter', () => {
            if (!this.animating_mobile_hand) {
                clearInterval(this.shakeInterval);
                this.animating_mobile_hand = true;
                this.svgContact.select('#mobile_hand_group')
                    .attr('transform', 'translate(' + (this.mobile_image_offsetX) + ', ' + (this.mobile_image_offsetY + (this.mobile_image_height * 0.409)) + '), scale(' + this.mobile_scale + ')')
                    .transition()
                    .duration(200)
                    .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeLinear"])
                    .attr('transform', 'translate(' + (this.mobile_image_offsetX + (this.mobile_image_width * 0.05)) + ', ' + (this.mobile_image_offsetY + (this.mobile_image_height * 0.409)) + '), scale(' + this.mobile_scale + ')');
                this.svgContact.selectAll('.zigzag').attr('stroke', '#8f8f8e');
                this.playClick.next();
                setTimeout(() => {
                    this.shakeInterval = setInterval(() => { this.shakeMobile(); }, 100);
                    this.playHapticFeedback(200);
                }, 200);
                setTimeout(() => {
                    this.svgContact.selectAll('.zigzag').attr('stroke', 'transparent');
                    clearInterval(this.shakeInterval);
                    this.animating_mobile_hand = false;
                }, 1000);
            }
        })
            .on('mouseleave', () => {
            this.svgContact.select('#mobile_hand_group')
                .attr('transform', 'translate(' + (this.mobile_image_offsetX + (this.mobile_image_width * 0.05)) + ', ' + (this.mobile_image_offsetY + (this.mobile_image_height * 0.409)) + '), scale(' + this.mobile_scale + ')')
                .transition()
                .duration(200)
                .ease(d3__WEBPACK_IMPORTED_MODULE_0__["easeLinear"])
                .attr('transform', 'translate(' + (this.mobile_image_offsetX) + ', ' + (this.mobile_image_offsetY + (this.mobile_image_height * 0.409)) + '), scale(' + this.mobile_scale + ')');
        });
        const handPath = 'M104.7,0C46.9,0,0,46.9,0,104.7v285.9h72.9V209.2c0.4,0,0.6,0,1,0h103.7V0H104.7z';
        const data = [{ y: 0 }, { y: 54.1 }, { y: (54.1 * 2) }, { y: (54.1 * 3) }];
        group.selectAll('rect.finger')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'finger')
            .attr('rx', 23.5)
            .attr('ry', 23.5)
            .attr('x', 160)
            .attr('y', (d) => d.y)
            .attr('width', (d, i) => i === 0 ? 230 : 122)
            .attr('height', 47)
            .style('fill', '#eee');
        group.append('path')
            .attr('d', handPath)
            .attr('fill', '#ccc');
        group.append('circle')
            .attr('class', 'nail')
            .attr('r', 20)
            .attr('cx', 359)
            .attr('cy', 24)
            .style('fill', '#832990');
        group.append('rect')
            .attr('class', 'nail')
            .attr('width', 33)
            .attr('height', 40)
            .attr('x', 359)
            .attr('y', 4)
            .style('fill', '#832990');
    }
}
DrawingContactService.ɵfac = function DrawingContactService_Factory(t) { return new (t || DrawingContactService)(); };
DrawingContactService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: DrawingContactService, factory: DrawingContactService.ɵfac });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_cursor_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/cursor.service */ "z1sW");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_multimodal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/multimodal.service */ "bTnw");
/* harmony import */ var _components_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/navigation/navigation.component */ "mvyS");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






const _c0 = function (a0) { return { hidden: a0 }; };
class AppComponent {
    constructor(cursorService, router, multimodalService) {
        this.cursorService = cursorService;
        this.router = router;
        this.multimodalService = multimodalService;
        this.title = 'eve-hoggan';
        this.page = '';
        this.config = this.multimodalService.config;
    }
    onMouseMove(e) {
        // change cursor when hovering clickable elements only when visual feedback is available
        if (this.multimodalService.config.modalities[1].active) {
            if (this.multimodalService.config.modalities[1].active && e.target.classList.contains('buttonEl')) {
                this.cursorService.moveCursor(e.pageX, e.pageY, true);
            }
            else {
                this.cursorService.moveCursor(e.pageX, e.pageY, false);
            }
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_cursor_service__WEBPACK_IMPORTED_MODULE_1__["CursorService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_multimodal_service__WEBPACK_IMPORTED_MODULE_3__["MultimodalService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], hostBindings: function AppComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mousemove", function AppComponent_mousemove_HostBindingHandler($event) { return ctx.onMouseMove($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveDocument"]);
    } }, decls: 6, vars: 3, consts: [["id", "cursor", 3, "ngClass"], ["id", "image-cursor"], ["id", "message-box"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-navigation");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "main");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 2);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, !ctx.config.modalities[1].active));
    } }, directives: [_components_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_4__["NavigationComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _components_frontpage_frontpage_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/frontpage/frontpage.component */ "2CWi");
/* harmony import */ var _components_multimodal_multimodal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/multimodal/multimodal.component */ "rE4P");
/* harmony import */ var _services_audio_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/audio.service */ "jHbz");
/* harmony import */ var _services_content_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/content.service */ "NBun");
/* harmony import */ var _services_drawing_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/drawing.service */ "1CK5");
/* harmony import */ var _services_voice_control_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/voice-control.service */ "vjam");
/* harmony import */ var _services_cursor_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/cursor.service */ "z1sW");
/* harmony import */ var _components_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/navigation/navigation.component */ "mvyS");
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/footer/footer.component */ "LmEr");
/* harmony import */ var _components_publications_publications_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/publications/publications.component */ "BBdW");
/* harmony import */ var ng_inline_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-inline-svg */ "e8Ap");
/* harmony import */ var _components_teaching_teaching_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/teaching/teaching.component */ "b6yF");
/* harmony import */ var _services_multimodal_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./services/multimodal.service */ "bTnw");
/* harmony import */ var _components_contact_contact_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/contact/contact.component */ "G2Gn");
/* harmony import */ var _services_drawing_contact_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./services/drawing-contact.service */ "QUYs");
/* harmony import */ var _services_navigator_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./services/navigator.service */ "ec3T");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/core */ "fXoL");























class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineInjector"]({ providers: [
        _services_content_service__WEBPACK_IMPORTED_MODULE_7__["ContentService"],
        _services_drawing_service__WEBPACK_IMPORTED_MODULE_8__["DrawingService"],
        _services_drawing_contact_service__WEBPACK_IMPORTED_MODULE_18__["DrawingContactService"],
        _services_cursor_service__WEBPACK_IMPORTED_MODULE_10__["CursorService"],
        _services_voice_control_service__WEBPACK_IMPORTED_MODULE_9__["VoiceControlService"],
        _services_audio_service__WEBPACK_IMPORTED_MODULE_6__["AudioService"],
        _services_multimodal_service__WEBPACK_IMPORTED_MODULE_16__["MultimodalService"],
        _services_navigator_service__WEBPACK_IMPORTED_MODULE_19__["NavigatorService"],
        { provide: _angular_common__WEBPACK_IMPORTED_MODULE_20__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_20__["HashLocationStrategy"] }
    ], imports: [[
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
            ng_inline_svg__WEBPACK_IMPORTED_MODULE_14__["InlineSVGModule"].forRoot()
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _components_frontpage_frontpage_component__WEBPACK_IMPORTED_MODULE_4__["FrontpageComponent"],
        _components_multimodal_multimodal_component__WEBPACK_IMPORTED_MODULE_5__["MultimodalComponent"],
        _components_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_11__["NavigationComponent"],
        _components_publications_publications_component__WEBPACK_IMPORTED_MODULE_13__["PublicationsComponent"],
        _components_teaching_teaching_component__WEBPACK_IMPORTED_MODULE_15__["TeachingComponent"],
        _components_contact_contact_component__WEBPACK_IMPORTED_MODULE_17__["ContactComponent"],
        _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__["FooterComponent"]], imports: [_app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"], ng_inline_svg__WEBPACK_IMPORTED_MODULE_14__["InlineSVGModule"]] }); })();


/***/ }),

/***/ "b6yF":
/*!***********************************************************!*\
  !*** ./src/app/components/teaching/teaching.component.ts ***!
  \***********************************************************/
/*! exports provided: TeachingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeachingComponent", function() { return TeachingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_content_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/content.service */ "NBun");
/* harmony import */ var src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/multimodal.service */ "bTnw");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../footer/footer.component */ "LmEr");





function TeachingComponent_li_6_div_3_p_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r1 == null ? null : item_r1.level);
} }
function TeachingComponent_li_6_div_3_p_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r1 == null ? null : item_r1.description);
} }
function TeachingComponent_li_6_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TeachingComponent_li_6_div_3_p_1_Template, 2, 1, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TeachingComponent_li_6_div_3_p_3_Template, 2, 1, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r1.level);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r1.description);
} }
const _c0 = function (a0) { return { hovereffect: a0 }; };
function TeachingComponent_li_6_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TeachingComponent_li_6_span_4_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.linkTo(item_r1 == null ? null : item_r1.url); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Learn more ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, ctx_r3.config.modalities[1].active));
} }
const _c1 = function (a0) { return { haptic: a0 }; };
function TeachingComponent_li_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TeachingComponent_li_6_div_3_Template, 5, 2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TeachingComponent_li_6_span_4_Template, 3, 3, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c1, ctx_r0.config.modalities[0].active));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r1 == null ? null : item_r1.course);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r1.description && item_r1.level);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r1 == null ? null : item_r1.url);
} }
const _c2 = function (a0) { return { darkMode: a0 }; };
class TeachingComponent {
    constructor(contentService, multimodalService) {
        this.contentService = contentService;
        this.multimodalService = multimodalService;
        this.courses = [];
        this.config = multimodalService.config;
        this.config.activePage = 'teaching';
    }
    linkTo(url) {
        this.multimodalService.playAudioClick();
        this.multimodalService.playHapticButtonClick(150);
        setTimeout(() => window.open(url, '_blank'), 500);
    }
    ngOnInit() {
        this.contentService.getCourses().subscribe(res => {
            this.courses = res;
        });
    }
}
TeachingComponent.ɵfac = function TeachingComponent_Factory(t) { return new (t || TeachingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_content_service__WEBPACK_IMPORTED_MODULE_1__["ContentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_2__["MultimodalService"])); };
TeachingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TeachingComponent, selectors: [["app-teaching"]], decls: 8, vars: 13, consts: [[1, "page-wrapper", 3, "ngClass"], [1, "page-section", "start", 3, "ngClass"], [1, "section-header", 3, "ngClass"], [1, "section-title", 3, "ngClass"], [1, "course-list"], ["class", "course-item", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "course-item", 3, "ngClass"], [1, "body-title"], ["class", "inline-text", 4, "ngIf"], ["class", "buttonEl site-explanation", 3, "click", 4, "ngIf"], [1, "inline-text"], ["class", "publication-type", 4, "ngIf"], ["class", "body-text", 4, "ngIf"], [1, "publication-type"], [1, "body-text"], [1, "buttonEl", "site-explanation", 3, "click"], [1, "arrow-link", "explanation", 3, "ngClass"]], template: function TeachingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Teaching");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ul", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, TeachingComponent_li_6_Template, 5, 6, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "app-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c1, ctx.config.modalities[0].active));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](7, _c2, ctx.config.theme === "dark-mode"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](9, _c1, ctx.config.modalities[0].active));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](11, _c2, ctx.config.theme === "dark-mode"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.courses);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: [".course-item.haptic[_ngcontent-%COMP%] {\n  scroll-snap-align:start;\n  \n}\n\n.page-section[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  padding: 0 var(--content-margin) var(--window-margin-top);\n  height: auto;\n}\n\n.section-header[_ngcontent-%COMP%] {\n  padding-top: var(--window-margin-top);\n}\n\n.section-header.haptic[_ngcontent-%COMP%] {\n  scroll-snap-align:start;\n}\n\n.course-item[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-right: 0;\n  padding: 60px 0;\n  box-sizing: border-box;\n  border-bottom: 1px solid rgba(170,170,170,0.3);\n  z-index: 100;\n}\n\n.course-item[_ngcontent-%COMP%]:last-child {\n  border-bottom:none;\n}\n\n.body-title[_ngcontent-%COMP%] {\n  margin-bottom: 30px;\n}\n\n.arrow-link[_ngcontent-%COMP%] {\n  border-top: 2px solid var(--color);\n}\n\n.arrow-link[_ngcontent-%COMP%]::after {\n  border-right: 2px solid  var(--color);\n  border-top: 2px solid  var(--color);\n}\n\n.site-explanation[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n\n@media screen and (max-width: 1400px) {\n  .course-item[_ngcontent-%COMP%] {\n    width: 100%;\n    margin: 0;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n\n  .page-section[_ngcontent-%COMP%] {\n    padding: 80px var(--content-margin);\n  }\n\n\n\n}\n\n@media screen and (max-width: 1000px) {\n  .course-item[_ngcontent-%COMP%] {\n    padding: 20px 0 40px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlYWNoaW5nLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIseURBQXlEO0VBQ3pELFlBQVk7QUFDZDs7QUFFQTtFQUNFLHFDQUFxQztBQUN2Qzs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFHQTtFQUNFLFdBQVc7RUFDWCxlQUFlO0VBQ2YsZUFBZTtFQUNmLHNCQUFzQjtFQUN0Qiw4Q0FBOEM7RUFDOUMsWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0NBQWtDO0FBQ3BDOztBQUNBO0VBQ0UscUNBQXFDO0VBQ3JDLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFHQTtFQUNFO0lBQ0UsV0FBVztJQUNYLFNBQVM7RUFDWDtFQUNBO0lBQ0UsY0FBYztFQUNoQjs7RUFFQTtJQUNFLG1DQUFtQztFQUNyQzs7OztBQUlGOztBQUdBO0VBQ0U7SUFDRSxvQkFBb0I7RUFDdEI7QUFDRiIsImZpbGUiOiJ0ZWFjaGluZy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uY291cnNlLWl0ZW0uaGFwdGljIHtcbiAgc2Nyb2xsLXNuYXAtYWxpZ246c3RhcnQ7XG4gIC8qIHRvcDogMTBweDsgKi9cbn1cblxuLnBhZ2Utc2VjdGlvbiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmc6IDAgdmFyKC0tY29udGVudC1tYXJnaW4pIHZhcigtLXdpbmRvdy1tYXJnaW4tdG9wKTtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4uc2VjdGlvbi1oZWFkZXIge1xuICBwYWRkaW5nLXRvcDogdmFyKC0td2luZG93LW1hcmdpbi10b3ApO1xufVxuXG4uc2VjdGlvbi1oZWFkZXIuaGFwdGljIHtcbiAgc2Nyb2xsLXNuYXAtYWxpZ246c3RhcnQ7XG59XG5cblxuLmNvdXJzZS1pdGVtIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1yaWdodDogMDtcbiAgcGFkZGluZzogNjBweCAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgxNzAsMTcwLDE3MCwwLjMpO1xuICB6LWluZGV4OiAxMDA7XG59XG5cbi5jb3Vyc2UtaXRlbTpsYXN0LWNoaWxkIHtcbiAgYm9yZGVyLWJvdHRvbTpub25lO1xufVxuXG4uYm9keS10aXRsZSB7XG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XG59XG5cbi5hcnJvdy1saW5rIHtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkIHZhcigtLWNvbG9yKTtcbn1cbi5hcnJvdy1saW5rOjphZnRlciB7XG4gIGJvcmRlci1yaWdodDogMnB4IHNvbGlkICB2YXIoLS1jb2xvcik7XG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCAgdmFyKC0tY29sb3IpO1xufVxuXG4uc2l0ZS1leHBsYW5hdGlvbiB7XG4gIG1hcmdpbi10b3A6IDMwcHg7XG59XG5cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTQwMHB4KSB7XG4gIC5jb3Vyc2UtaXRlbSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAwO1xuICB9XG4gIC5zZWN0aW9uLXRpdGxlIHtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgfVxuXG4gIC5wYWdlLXNlY3Rpb24ge1xuICAgIHBhZGRpbmc6IDgwcHggdmFyKC0tY29udGVudC1tYXJnaW4pO1xuICB9XG5cblxuXG59XG5cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAwMHB4KSB7XG4gIC5jb3Vyc2UtaXRlbSB7XG4gICAgcGFkZGluZzogMjBweCAwIDQwcHg7XG4gIH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ "bTnw":
/*!************************************************!*\
  !*** ./src/app/services/multimodal.service.ts ***!
  \************************************************/
/*! exports provided: MultimodalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultimodalService", function() { return MultimodalService; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _models_configuration_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/configuration.model */ "M4Nl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _audio_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./audio.service */ "jHbz");
/* harmony import */ var _navigator_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navigator.service */ "ec3T");





class MultimodalService {
    // browser: any;
    constructor(document, audioService, navigatorService) {
        this.document = document;
        this.audioService = audioService;
        this.navigatorService = navigatorService;
        this.config = new _models_configuration_model__WEBPACK_IMPORTED_MODULE_1__["Config"]();
        // this.browser = this.navigatorService.identifyBrowser();
    }
    updateTheme(theme) {
        if (theme === 'dark-mode') {
            this.document.body.classList.add('dark-mode');
            this.document.getElementById('sidebar-menu').classList.add('dark-mode');
            this.document.getElementById('image-cursor').classList.add('darkMode');
            if (this.config.modalities[3].active) {
                this.document.getElementById('speech-balloon').classList.add('darkMode');
            }
        }
        else {
            this.document.body.classList.remove('dark-mode');
            this.document.getElementById('sidebar-menu').classList.remove('dark-mode');
            this.document.getElementById('image-cursor').classList.remove('darkMode');
            if (this.config.modalities[3].active) {
                this.document.getElementById('speech-balloon').classList.remove('darkMode');
            }
        }
    }
    loadAudio() {
        this.config.subtleClick = this.document.getElementById('audio-click');
        this.config.slideClick = this.document.getElementById('audio-slide-click');
        this.config.slideSound = this.document.getElementById('audio-slide');
        this.config.gateLatch = this.document.getElementById('audio-gate-latch-click');
        this.config.hardClick = this.document.getElementById('audio-hard-click');
        this.config.onOffSwitchSound = this.document.getElementById('audio-on-off-light-switch');
        this.config.lockSound = this.document.getElementById('audio-lock-sound');
    }
    playAudioClick() {
        if (this.config.modalities[2].active) { //only play when audio modality is activitated
            this.audioService.playSound(this.config.subtleClick);
        }
    }
    playAudioSlideClick() {
        if (this.config.modalities[2].active) {
            this.audioService.playSound(this.config.slideClick);
        }
    }
    playAudioSlide() {
        if (this.config.modalities[2].active) {
            this.config.slideSound.volume = 0.3;
            this.audioService.playSound(this.config.slideSound);
        }
    }
    playMechanicalClick() {
        if (this.config.modalities[2].active) {
            this.config.lockSound.volume = 0.3;
            this.audioService.playSound(this.config.lockSound);
        }
    }
    playHardClick() {
        if (this.config.modalities[2].active) {
            this.audioService.playSound(this.config.hardClick);
        }
    }
    playOnOffSwitch() {
        if (this.config.modalities[2].active) {
            this.audioService.playSound(this.config.onOffSwitchSound);
        }
    }
    playGateLatch() {
        if (this.config.modalities[2].active) {
            this.audioService.playSound(this.config.gateLatch);
        }
    }
    playHapticButtonClick(value) {
        if (window.navigator && window.navigator.vibrate) {
            if (this.config.modalities.filter(m => m.name === 'haptic')[0].active) {
                window.navigator.vibrate(value);
            }
        }
    }
}
MultimodalService.ɵfac = function MultimodalService_Factory(t) { return new (t || MultimodalService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_audio_service__WEBPACK_IMPORTED_MODULE_3__["AudioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_navigator_service__WEBPACK_IMPORTED_MODULE_4__["NavigatorService"])); };
MultimodalService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: MultimodalService, factory: MultimodalService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "ec3T":
/*!***********************************************!*\
  !*** ./src/app/services/navigator.service.ts ***!
  \***********************************************/
/*! exports provided: NavigatorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigatorService", function() { return NavigatorService; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var decibel_meter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! decibel-meter */ "JoZW");
/* harmony import */ var decibel_meter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(decibel_meter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class NavigatorService {
    constructor(document) {
        this.document = document;
        this.isRecording = false;
        this.decibels = 0;
        this.meter = new decibel_meter__WEBPACK_IMPORTED_MODULE_1___default.a('mic');
        this.soundLevelArray = [0, 0, 0, 0, 0];
        this.iteration = 0;
        this.sourceAvailable = false;
    }
    initializeAudioDetection() {
        this.meter.sources.then(sources => {
            if (sources[0].deviceId.length > 0) {
                this.sourceAvailable = true;
                this.meter.connect(sources[0]);
            }
            else {
                this.showMessage("It looks like the access to your microphone is blocked.");
            }
        });
    }
    disconnectAudioListener() {
        this.meter.disconnect();
    }
    startDetecting() {
        // if (this.sourceAvailable) {
        this.isRecording = true;
        this.meter.listenTo(0, (dB, percent) => {
            this.iteration++;
            this.decibels = Number(`${dB}`) + 100;
            if (this.iteration === 4) {
                this.iteration = 0;
                this.updateSoundWave(this.decibels);
            }
        });
        if (this.document.getElementById('audio-input')) {
            this.document.getElementById('audio-input').style.opacity = "1";
        }
        // }
    }
    stopDetecting() {
        // if (this.sourceAvailable) {
        this.isRecording = false;
        this.meter.stopListening();
        if (this.document.getElementById('audio-input')) {
            this.document.getElementById('audio-input').style.opacity = "0";
        }
        // }
    }
    updateSoundWave(level) {
        for (let i = this.soundLevelArray.length - 1; i > 0; i--) {
            this.soundLevelArray[i] = Math.round(this.soundLevelArray[i - 1] * 0.8);
        }
        this.soundLevelArray[0] = Math.round(level) * 0.6;
        const element = this.document.getElementById('bar1');
        if (element !== null && element !== undefined) {
            for (let n = 0; n < this.soundLevelArray.length; n++) {
                this.document.getElementById('bar' + (n + 1)).style.width = (this.soundLevelArray[n] + 3) + 'px';
            }
        }
    }
    // [Microsoft Edge, Apple Safari, Google Chrome or Chromium, Samsung Internet]  support speechrecognition
    identifyBrowser() {
        let sBrowser, sUsrAg = navigator.userAgent;
        if (sUsrAg.indexOf('Firefox') > -1) {
            sBrowser = 'Mozilla Firefox';
            // 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0'
        }
        else if (sUsrAg.indexOf('SamsungBrowser') > -1) {
            sBrowser = 'Samsung Internet';
            // 'Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
        }
        else if (sUsrAg.indexOf('Opera') > -1 || sUsrAg.indexOf('OPR') > -1) {
            sBrowser = 'Opera';
            // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106'
        }
        else if (sUsrAg.indexOf('Trident') > -1) {
            sBrowser = 'Microsoft Internet Explorer';
            // 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko'
        }
        else if (sUsrAg.indexOf('Edge') > -1) {
            sBrowser = 'Microsoft Edge';
            // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299'
        }
        else if (sUsrAg.indexOf('Chrome') > -1) {
            sBrowser = 'Google Chrome or Chromium';
            // 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36'
        }
        else if (sUsrAg.indexOf('Safari') > -1) {
            sBrowser = 'Apple Safari';
            // 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306'
        }
        else {
            sBrowser = 'unknown';
        }
        return sBrowser;
    }
    showMessage(msg) {
        this.document.getElementById('message-box').classList.add('visible');
        this.document.getElementById('message-box').innerHTML = msg;
        this.hideMessage();
    }
    hideMessage() {
        clearTimeout(this.showMsgTimout);
        this.showMsgTimout = setTimeout(() => {
            this.document.getElementById('message-box').classList.remove('visible');
        }, 3000);
    }
}
NavigatorService.ɵfac = function NavigatorService_Factory(t) { return new (t || NavigatorService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"])); };
NavigatorService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: NavigatorService, factory: NavigatorService.ɵfac });


/***/ }),

/***/ "jHbz":
/*!*******************************************!*\
  !*** ./src/app/services/audio.service.ts ***!
  \*******************************************/
/*! exports provided: AudioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioService", function() { return AudioService; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AudioService {
    constructor(document) {
        this.document = document;
    }
    playSound(sound) {
        if (sound.paused) {
            sound.play();
        }
        else {
            sound.currentTime = 0;
        }
    }
    loadAudio(audio, id) {
        audio = this.document.getElementById(id);
    }
}
AudioService.ɵfac = function AudioService_Factory(t) { return new (t || AudioService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"])); };
AudioService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AudioService, factory: AudioService.ɵfac });


/***/ }),

/***/ "mvyS":
/*!***************************************************************!*\
  !*** ./src/app/components/navigation/navigation.component.ts ***!
  \***************************************************************/
/*! exports provided: NavigationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationComponent", function() { return NavigationComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_voice_control_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/voice-control.service */ "vjam");
/* harmony import */ var src_app_services_content_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/content.service */ "NBun");
/* harmony import */ var src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/multimodal.service */ "bTnw");
/* harmony import */ var src_app_services_drawing_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/drawing.service */ "1CK5");
/* harmony import */ var _multimodal_multimodal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../multimodal/multimodal.component */ "rE4P");









const _c0 = function (a0) { return { hovereffect: a0 }; };
function NavigationComponent_li_11_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NavigationComponent_li_11_Template_div_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4); const nav_r2 = ctx.$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r3.navigateTo(nav_r2.hash); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const nav_r2 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c0, ctx_r0.multimodalService.config.modalities[1].active));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-text", nav_r2.page);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](nav_r2.page);
} }
function NavigationComponent_li_22_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NavigationComponent_li_22_Template_li_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7); const item_r5 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r6.linkTo(item_r5.url); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("alt", "visit my ", item_r5.name, " profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", item_r5.name, " ");
} }
class NavigationComponent {
    constructor(document, router, voiceControlService, contentService, multimodalService, drawingService, ngZone) {
        this.document = document;
        this.router = router;
        this.voiceControlService = voiceControlService;
        this.contentService = contentService;
        this.multimodalService = multimodalService;
        this.drawingService = drawingService;
        this.ngZone = ngZone;
        this.menu_visible = false;
        this.voiceControlService.link.subscribe(res => {
            this.ngZone.run(() => this.navigateTo(res));
        });
        this.voiceControlService.changeTheme.subscribe(res => {
            this.updateTheme(res);
        });
        this.voiceControlService.showNavigationMenu.subscribe(res => {
            this.showNavigationMenu();
        });
        this.voiceControlService.openUrl.subscribe(res => {
            let url;
            if (res === 'mail') {
                url = 'mailto:' + this.contact_info.email;
            }
            else if (res === 'linkedin' || res === 'twitter') {
                url = this.contact_info.social_media.filter(s => s.name.toLowerCase() === res)[0].url;
            }
            window.open(url, '_blank');
        });
    }
    navigateTo(link) {
        this.multimodalService.playHapticButtonClick(100);
        this.router.navigate(['', link]);
        window.scrollTo(0, 0);
        this.document.getElementById('image-cursor').style.backgroundImage = 'none';
        this.document.getElementById('image-cursor').style.opacity = '0';
        if (this.menu_visible) {
            this.showNavigationMenu();
        }
    }
    showNavigationMenu() {
        this.menu_visible = !this.menu_visible;
        this.multimodalService.playAudioSlide();
        this.multimodalService.playHapticButtonClick([150, 200, 100]);
        this.multimodalService.config.inputActive = false;
        this.multimodalService.config.inputFocus = false;
        if (this.menu_visible) {
            this.document.getElementById('sidebar-menu').classList.add('open');
            this.document.getElementById('menu-icon').classList.add('open');
            setTimeout(() => {
                this.document.getElementById('full-screen-menu').classList.add('visible');
                this.document.getElementById('open-menu').classList.add('animate');
                this.document.getElementById('menu-contact-details').classList.add('animate');
            }, 200);
        }
        else {
            this.document.getElementById('full-screen-menu').classList.remove('visible');
            setTimeout(() => {
                this.document.getElementById('sidebar-menu').classList.remove('open');
                this.document.getElementById('menu-icon').classList.remove('open');
                this.document.getElementById('open-menu').classList.remove('animate');
                this.document.getElementById('menu-contact-details').classList.remove('animate');
            }, 500);
        }
    }
    ngOnInit() {
        this.contentService.getContactInfo().subscribe(res => {
            this.contact_info = res;
        });
    }
    updateTheme(voicecontrolled = null) {
        this.multimodalService.playAudioSlideClick();
        this.multimodalService.playHapticButtonClick([100, 50, 100]);
        this.multimodalService.config.theme = this.multimodalService.config.theme === 'light-mode' ? 'dark-mode' : 'light-mode';
        this.drawingService.changeMode(this.multimodalService.config.theme);
        this.multimodalService.updateTheme(this.multimodalService.config.theme);
        if (voicecontrolled) {
            this.document.getElementById('toggleSwitch').checked = voicecontrolled === 'dark-mode' ? true : false;
        }
    }
    linkTo(url) {
        this.multimodalService.playAudioClick();
        this.multimodalService.playHapticButtonClick(150);
        window.open(url);
    }
}
NavigationComponent.ɵfac = function NavigationComponent_Factory(t) { return new (t || NavigationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_voice_control_service__WEBPACK_IMPORTED_MODULE_3__["VoiceControlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_content_service__WEBPACK_IMPORTED_MODULE_4__["ContentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_5__["MultimodalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_drawing_service__WEBPACK_IMPORTED_MODULE_6__["DrawingService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"])); };
NavigationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: NavigationComponent, selectors: [["app-navigation"]], decls: 23, vars: 12, consts: [["id", "sidebar-menu", 1, "site-navigation"], ["id", "menu-icon", 1, "menu", "buttonEl", 3, "ngClass", "click"], [1, "screen-multimodal-menu"], [1, "theme-toggle-switch"], [1, "switch", "buttonEl"], ["type", "checkbox", "id", "toggleSwitch", 1, "buttonEl", 3, "change"], [1, "slider", "round", "buttonEl"], ["id", "full-screen-menu", 1, "open-site-navigation"], ["id", "open-menu", 1, "menu-items"], ["class", "buttonEl", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "mobile-multimodal-menu"], ["id", "menu-contact-details", 1, "contact-details"], [1, "email", "buttonEl"], [1, "email-text", "buttonEl"], [1, "buttonEl", "email-text", "mail", 3, "click"], [1, "buttonEl", "arrow-link", 3, "ngClass"], [1, "social-media-list"], ["class", "buttonEl", 3, "alt", "click", 4, "ngFor", "ngForOf"], [1, "buttonEl", 3, "ngClass"], [1, "nav-item", 3, "click"], [1, "fill-text-on-hover", "buttonEl"], [1, "buttonEl", 3, "alt", "click"]], template: function NavigationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NavigationComponent_Template_div_click_1_listener() { return ctx.showNavigationMenu(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "app-multimodal");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function NavigationComponent_Template_input_change_7_listener() { return ctx.updateTheme(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "ul", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, NavigationComponent_li_11_Template, 4, 5, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "app-multimodal");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "p", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NavigationComponent_Template_span_click_18_listener() { return ctx.linkTo("mailto:" + (ctx.contact_info == null ? null : ctx.contact_info.email)); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "ul", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, NavigationComponent_li_22_Template, 2, 2, "li", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](8, _c0, ctx.multimodalService.config.modalities[1].active));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMapInterpolate1"]("theme-state-icon ", ctx.multimodalService.config.theme, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.contact_info == null ? null : ctx.contact_info.navigation);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.contact_info == null ? null : ctx.contact_info.email);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](10, _c0, ctx.multimodalService.config.modalities[1].active));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.contact_info == null ? null : ctx.contact_info.social_media);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["NgClass"], _multimodal_multimodal_component__WEBPACK_IMPORTED_MODULE_7__["MultimodalComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"]], styles: ["a[_ngcontent-%COMP%] {\n  text-decoration: none;\n  cursor: pointer;\n  outline: none;\n}\n\n.site-navigation[_ngcontent-%COMP%] {\n  position: fixed;\n  top:0;\n  left:0;\n  width: 120px;\n  height: 100vh;\n  border-right: 1px solid var(--base-color2);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  box-sizing: border-box;\n  padding: 40px;\n  \n  transition: all 0.2s ease;\n  z-index: 200;\n  min-height: 600px;\n}\n\n.site-navigation.dark-mode[_ngcontent-%COMP%] {\n  background: var(--base-color2);\n  border-right: 1px solid rgba(255,255,255,0.5);\n}\n\n.site-navigation.open[_ngcontent-%COMP%] {\n  background: var(--color);\n  color: var(--base-color1);\n  border-right: 1px solid var(--base-color1);\n}\n\n.open-site-navigation[_ngcontent-%COMP%] {\n  position: fixed;\n  top:0;\n  height: 100vh;\n  background: var(--color);\n  width: 100vw;\n  margin-left: -100vw;\n  transition: all 0.5s ease-in-out;\n  overflow: hidden;\n  z-index: 199;\n}\n\n.open-site-navigation.visible[_ngcontent-%COMP%] {\n  margin-left:0;\n  box-shadow: 5px 0 20px rgba(0,0,0,0.2);\n}\n\n.screen-multimodal-menu[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n\n.mobile-multimodal-menu[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  bottom:0;\n  margin-bottom: 150px;\n  height: auto;\n  width: 100%;\n  text-align:center;\n}\n\n.site-navigation-title[_ngcontent-%COMP%] {\n  position: absolute;\n  transform: translate(-40px, -50%) rotate(-90deg);\n  display: inline-block;\n  bottom: 8vh;\n  left:0;\n  font-family: var(--base-font-title);\n  font-weight: 400;\n  font-size: var(--font-size-medium);\n  height: 120px;\n  width: 200px;\n  line-height: 120px;\n}\n\n.menu[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  width: 40px;\n  height: 20px;\n  overflow:visible;\n  z-index: 100;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.menu[_ngcontent-%COMP%]::before, .menu[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  width: 40px;\n  height: 0;\n  border-bottom: 4px solid var(--base-color2);\n  background: transparent;\n  transition: all 0.2s ease;\n}\n\n#sidebar-menu.open[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]::before, #sidebar-menu.open[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]::after, #sidebar-menu.dark-mode[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]::before, #sidebar-menu.dark-mode[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]::after {\n  border-bottom: 4px solid var(--base-color1);\n}\n\n.menu[_ngcontent-%COMP%]::before {\n  top: 0;\n  left:0;\n}\n\n.menu[_ngcontent-%COMP%]::after {\n  bottom: 2px;\n  right: 0;\n}\n\n.menu.hovereffect[_ngcontent-%COMP%]:hover::before {\n  top: 3px;\n  left: 5px;\n}\n\n.menu.hovereffect[_ngcontent-%COMP%]:hover::after {\n  bottom: 5px;\n  right: 5px;\n}\n\n.menu.hovereffect.open[_ngcontent-%COMP%]::before {\n  top: 8px!important;\n  left: 0!important;\n}\n\n.menu.hovereffect.open[_ngcontent-%COMP%]::after {\n  right: 0px!important;\n  bottom: 8px!important;\n}\n\n.menu[_ngcontent-%COMP%]:active::before, .menu.open[_ngcontent-%COMP%]::before {\n  top: 8px;\n  left: 0;\n  transform: rotate(45deg);\n}\n\n.menu[_ngcontent-%COMP%]:active::after, .menu.open[_ngcontent-%COMP%]::after {\n  bottom: 8px;\n  right: 1px;\n  transform: rotate(135deg);\n}\n\nul.menu-items[_ngcontent-%COMP%] {\n  list-style-type: none;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-60%);\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  padding: 15vh var(--content-margin);\n  margin: 0 0 0 120px;\n  width: var(--window-width);\n  height: auto;\n  box-sizing: border-box;\n  justify-content: space-between;\n}\n\n#open-menu.animate[_ngcontent-%COMP%] {\n  animation: fadeInMenu ease 1.5s;\n}\n\n@keyframes fadeInMenu {\n  0% {\n    opacity: 0;\n    margin-left: 60px;\n  }\n  20% {\n    opacity: 0;\n    margin-left: 60px;\n  }\n  100% {\n    opacity: 1;\n    margin-left: var(--window-margin);\n  }\n}\n\n#menu-contact-details.animate[_ngcontent-%COMP%] {\n  animation: fadeInContactDetails ease 2s;\n}\n\n@keyframes fadeInContactDetails {\n  0% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\nul.menu-items[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n  margin: 8vh 1vw;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.fill-text-on-hover[_ngcontent-%COMP%] {\n  color: var(--base-color1);\n  font-family: var(--base-font-body);\n  font-weight: 500;\n  font-size: 2.8vw;\n  padding:0;\n  margin:0;\n  white-space: nowrap;\n  text-rendering: geometricPrecision;\n}\n\nul.menu-items[_ngcontent-%COMP%]   li.hovereffect[_ngcontent-%COMP%]   .fill-text-on-hover[_ngcontent-%COMP%]:after{\n  content: attr(data-text);\n  width:0%;\n  color: var(--base-color1);\n  position:absolute;\n  top:0;\n  left:0;\n  overflow:hidden;\n  transition: 0.8s ease-in-out;\n  font-family: var(--base-font-body);\n  font-weight: 500;\n  font-size: 2.8vw;\n  white-space: nowrap;\n  text-rendering: geometricPrecision;\n}\n\nul.menu-items[_ngcontent-%COMP%]   li.hovereffect[_ngcontent-%COMP%]:hover   .fill-text-on-hover[_ngcontent-%COMP%] {\n  color: rgba(255,255,255,0.3);\n}\n\nul.menu-items[_ngcontent-%COMP%]   li.hovereffect[_ngcontent-%COMP%]:hover   .fill-text-on-hover[_ngcontent-%COMP%]:after {\n  width:100%;\n}\n\n.contact-details[_ngcontent-%COMP%] {\n  position: absolute;\n  width: var(--window-width);\n  margin-left: var(--window-margin);\n  box-sizing: border-box;\n  left:0;\n  bottom:0;\n  padding: 8vh var(--content-margin);\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n\nul.social-media-list[_ngcontent-%COMP%] {\n  list-style-type: none;\n  display: inline-flex;\n  flex-direction: row;\n  padding: 10px 0;\n  margin:0;\n  width: auto;\n  height: auto;\n  font-family: var(--base-font-title);\n  text-transform: uppercase;\n  box-sizing: border-box;\n  color: var(--base-color1);\n  font-size: 22px;\n  vertical-align: bottom;\n}\n\nul.social-media-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 0 1.5vw 0 5vw;\n  width: auto;\n  cursor: pointer;\n}\n\n.email-text[_ngcontent-%COMP%] {\n  font-family: var(--base-font-title);\n  text-transform: uppercase;\n  font-size: 22px;\n  padding: 0;\n  margin: 0.5em 1.5vw;\n  color: var(--base-color1);\n  vertical-align: top;\n}\n\n.email-text.mail[_ngcontent-%COMP%] {\n  display: inline-block;\n  color: rgba(255,255,255,0.5);\n  font-family: var(--base-font-body);\n  text-transform: none;\n  font-weight: 300;\n  cursor:pointer;\n}\n\n.email-text[_ngcontent-%COMP%]:hover   .arrow-link[_ngcontent-%COMP%] {\n  margin-left: 10px;\n  opacity: 0.5;\n}\n\n.email-text[_ngcontent-%COMP%]:hover   .arrow-link.hovereffect[_ngcontent-%COMP%] {\n  margin-left: 20px;\n  opacity: 1;\n}\n\n\n\n.theme-toggle-switch[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.theme-state-icon[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 24px;\n  height: 24px;\n  background: #eee;\n  border-radius: 24px;\n  margin: 15px 8px;\n}\n\n.theme-state-icon[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: relative;\n  opacity: 0;\n  width: 24px;\n  left: 20px;\n  top: -20px;\n  height: 24px;\n  background: var(--base-color2);\n  transition: color 0.8s ease;\n  border-radius: 24px;\n}\n\n.site-navigation.open[_ngcontent-%COMP%]   .theme-state-icon[_ngcontent-%COMP%]::after {\n  background: var(--color);\n}\n\n.theme-state-icon.dark-mode[_ngcontent-%COMP%]::after {\n  left: 7px;\n  top: -7px;\n  opacity: 1;\n  display: inline-block;\n  animation: moveOver 0.7s ease;\n  animation-iteration-count: 1;\n}\n\n@keyframes moveOver {\n  0% {\n    left: 20px;\n    top: -20px;\n    opacity: 0;\n  }\n  20% {\n    left: 20px;\n    top: -20px;\n    opacity: 1;\n  }\n  100% {\n    left: 7px;\n    top: -7px;\n    opacity: 1;\n  }\n}\n\n.switch[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  width: 20px;\n  height: 50px;\n  margin: 0 10px;\n  -webkit-tap-highlight-color: transparent;\n}\n\n\n\n.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n\n\n.slider[_ngcontent-%COMP%] {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  transition: .4s;\n  box-shadow: inset 0px 0px 5px rgba(0,0,0,0.3);\n}\n\n.slider[_ngcontent-%COMP%]:before {\n  position: absolute;\n  content: \"\";\n  height: 20px;\n  width: 20px;\n  box-shadow: 0px 0px 5px rgba(0,0,0,0.3);\n  left: 0px;\n  bottom: 0px;\n  background-color: white;\n  transition: .4s;\n}\n\ninput[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%] {\n  background-color: #000;\n  box-shadow: inset 0px 0px 15px rgba(255, 255, 255, 0.2);\n}\n\n\n\ninput[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%]:before {\n  transform: translateY(-30px);\n  background-color: #444;\n}\n\n\n\n.slider.round[_ngcontent-%COMP%] {\n  border-radius: 20px;\n}\n\n.slider.round[_ngcontent-%COMP%]:before {\n  border-radius: 50%;\n}\n\n@media screen and (max-width: 1400px) {\n  .site-navigation[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 45px var(--content-margin);\n    height: 110px;\n    min-height: 50px;\n    border-bottom: 1px solid var(--base-color2);\n    border-right: none;\n    flex-direction: row;\n    background: var(--base-color1);\n  }\n\n  .theme-toggle-switch[_ngcontent-%COMP%] {\n    flex-direction: row;\n  }\n\n  .theme-state-icon[_ngcontent-%COMP%] {\n    transform: translateY(-68%);\n  }\n\n  ul.menu-items[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .switch[_ngcontent-%COMP%] {\n    width: 50px;\n    height: 20px;\n    margin: 0 10px;\n  }\n\n  input[_ngcontent-%COMP%]:checked    + .slider[_ngcontent-%COMP%]:before {\n    transform: translateX(30px);\n  }\n\n\n  .open-site-navigation[_ngcontent-%COMP%] {\n    position: fixed;\n    margin-left: 0;\n    margin-top: -100vh;\n  }\n\n  .open-site-navigation.visible[_ngcontent-%COMP%] {\n    margin-top: 0;\n    margin-left: 0;\n  }\n\n  .site-navigation.open[_ngcontent-%COMP%], .site-navigation.dark-mode[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 1px solid var(--base-color1);\n  }\n\n\n  @keyframes fadeInMenu {\n    0% {\n      opacity: 0;\n      margin-top: 60px;\n    }\n    20% {\n      opacity: 0;\n      margin-top: 60px;\n    }\n    100% {\n      opacity: 1;\n      margin-top: var(--window-margin);\n    }\n  }\n\n}\n\n@media screen and (max-width: 1000px) {\n\n\n  ul.menu-items[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding: 0 var(--content-margin);\n    transform: translateY(-50%);\n  }\n  ul.menu-items[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: center;\n    margin: 3.5vh 0;\n  }\n\n  .fill-text-on-hover[_ngcontent-%COMP%] {\n    font-size: 5vw;\n  }\n\n  .fill-text-on-hover[_ngcontent-%COMP%]:after {\n    display: none;\n  }\n\n  #menu-contact-details[_ngcontent-%COMP%] {\n    display:none;\n  }\n\n\n  .contact-details[_ngcontent-%COMP%] {\n    flex-direction: column;\n    justify-content:unset;\n  }\n\n  ul.social-media-list[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  ul.social-media-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    margin: 20px 0;\n  }\n\n  .site-navigation[_ngcontent-%COMP%] {\n    padding: 45px var(--content-margin);\n  }\n\n  .email-text[_ngcontent-%COMP%], ul.social-media-list[_ngcontent-%COMP%] {\n    font-size: 18px;\n\n  }\n}\n\n@media screen and (max-width: 900px) {\n  .menu.hovereffect[_ngcontent-%COMP%]:hover::before {\n    top: 0;\n    left:0;\n  }\n\n  .menu.hovereffect[_ngcontent-%COMP%]:hover::after {\n    bottom: 2px;\n    right: 0;\n  }\n\n  .fill-text-on-hover[_ngcontent-%COMP%] {\n    font-size: 6vw;\n  }\n}\n\n@media screen and (max-width: 700px) {\n\n  .site-navigation[_ngcontent-%COMP%] {\n    padding: 44px var(--content-margin);\n    height: 90px;\n    margin-top: -15px;\n    position:fixed;\n  }\n\n  .mobile-multimodal-menu[_ngcontent-%COMP%] {\n    display: inline-block;\n  }\n  .screen-multimodal-menu[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  ul.menu-items[_ngcontent-%COMP%] {\n    transform: translateY(-55%);\n  }\n\n  .fill-text-on-hover[_ngcontent-%COMP%] {\n    font-size: 7vw;\n  }\n\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtFQUNmLEtBQUs7RUFDTCxNQUFNO0VBQ04sWUFBWTtFQUNaLGFBQWE7RUFDYiwwQ0FBMEM7RUFDMUMsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qiw4QkFBOEI7RUFDOUIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixvQ0FBb0M7RUFDcEMseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSw4QkFBOEI7RUFDOUIsNkNBQTZDO0FBQy9DOztBQUdBO0VBQ0Usd0JBQXdCO0VBQ3hCLHlCQUF5QjtFQUN6QiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsS0FBSztFQUNMLGFBQWE7RUFDYix3QkFBd0I7RUFDeEIsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixnQ0FBZ0M7RUFDaEMsZ0JBQWdCO0VBQ2hCLFlBQVk7QUFDZDs7QUFHQTtFQUNFLGFBQWE7RUFDYixzQ0FBc0M7QUFDeEM7O0FBQ0E7RUFDRSxxQkFBcUI7QUFDdkI7O0FBQ0E7RUFDRSxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixvQkFBb0I7RUFDcEIsWUFBWTtFQUNaLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxrQkFBa0I7RUFLbEIsZ0RBQWdEO0VBQ2hELHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsTUFBTTtFQUNOLG1DQUFtQztFQUNuQyxnQkFBZ0I7RUFDaEIsa0NBQWtDO0VBQ2xDLGFBQWE7RUFDYixZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCOztBQUdBO0VBQ0Usa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osZUFBZTtFQUNmLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFNBQVM7RUFDVCwyQ0FBMkM7RUFDM0MsdUJBQXVCO0VBQ3ZCLHlCQUF5QjtBQUMzQjs7QUFFQTs7OztFQUlFLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLE1BQU07RUFDTixNQUFNO0FBQ1I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsUUFBUTtBQUNWOztBQUVBO0VBQ0UsUUFBUTtFQUNSLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFFBQVE7RUFDUixPQUFPO0VBS1Asd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFVBQVU7RUFLVix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLFFBQVE7RUFLUiwyQkFBMkI7RUFDM0IsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsbUNBQW1DO0VBQ25DLG1CQUFtQjtFQUNuQiwwQkFBMEI7RUFDMUIsWUFBWTtFQUNaLHNCQUFzQjtFQUN0Qiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRTtJQUNFLFVBQVU7SUFDVixpQkFBaUI7RUFDbkI7RUFDQTtJQUNFLFVBQVU7SUFDVixpQkFBaUI7RUFDbkI7RUFDQTtJQUNFLFVBQVU7SUFDVixpQ0FBaUM7RUFDbkM7QUFDRjs7QUFFQTtFQUNFLHVDQUF1QztBQUN6Qzs7QUFFQTtFQUNFO0lBQ0UsVUFBVTtFQUNaO0VBQ0E7SUFDRSxVQUFVO0VBQ1o7RUFDQTtJQUNFLFVBQVU7RUFDWjtBQUNGOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YsZUFBZTtFQUNmLHdDQUF3QztBQUMxQzs7QUFHQTtFQUNFLHlCQUF5QjtFQUN6QixrQ0FBa0M7RUFDbEMsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixTQUFTO0VBQ1QsUUFBUTtFQUNSLG1CQUFtQjtFQUNuQixrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSx3QkFBd0I7RUFDeEIsUUFBUTtFQUNSLHlCQUF5QjtFQUN6QixpQkFBaUI7RUFDakIsS0FBSztFQUNMLE1BQU07RUFDTixlQUFlO0VBQ2YsNEJBQTRCO0VBQzVCLGtDQUFrQztFQUNsQyxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixrQ0FBa0M7QUFDcEM7O0FBQ0E7RUFDRSw0QkFBNEI7QUFDOUI7O0FBR0E7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsMEJBQTBCO0VBQzFCLGlDQUFpQztFQUNqQyxzQkFBc0I7RUFDdEIsTUFBTTtFQUNOLFFBQVE7RUFDUixrQ0FBa0M7RUFDbEMsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsUUFBUTtFQUNSLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUNBQW1DO0VBQ25DLHlCQUF5QjtFQUN6QixzQkFBc0I7RUFDdEIseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsV0FBVztFQUNYLGVBQWU7QUFDakI7O0FBR0E7RUFDRSxtQ0FBbUM7RUFDbkMseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLHlCQUF5QjtFQUN6QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsNEJBQTRCO0VBQzVCLGtDQUFrQztFQUNsQyxvQkFBb0I7RUFDcEIsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFVBQVU7QUFDWjs7QUFHQSxrQkFBa0I7O0FBQ2xCO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsV0FBVztFQUNYLFVBQVU7RUFDVixVQUFVO0VBQ1YsWUFBWTtFQUNaLDhCQUE4QjtFQUM5QiwyQkFBMkI7RUFDM0IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsU0FBUztFQUNULFNBQVM7RUFDVCxVQUFVO0VBQ1YscUJBQXFCO0VBQ3JCLDZCQUE2QjtFQUM3Qiw0QkFBNEI7QUFDOUI7O0FBR0E7RUFDRTtJQUNFLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtFQUNaO0VBQ0E7SUFDRSxVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7RUFDWjtFQUNBO0lBQ0UsU0FBUztJQUNULFNBQVM7SUFDVCxVQUFVO0VBQ1o7QUFDRjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIsV0FBVztFQUNYLFlBQVk7RUFDWixjQUFjO0VBQ2Qsd0NBQXdDO0FBQzFDOztBQUVBLCtCQUErQjs7QUFDL0I7RUFDRSxVQUFVO0VBQ1YsUUFBUTtFQUNSLFNBQVM7QUFDWDs7QUFFQSxlQUFlOztBQUNmO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixNQUFNO0VBQ04sT0FBTztFQUNQLFFBQVE7RUFDUixTQUFTO0VBQ1Qsc0JBQXNCO0VBS3RCLGVBQWU7RUFDZiw2Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixXQUFXO0VBQ1gsdUNBQXVDO0VBQ3ZDLFNBQVM7RUFDVCxXQUFXO0VBQ1gsdUJBQXVCO0VBS3ZCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsdURBQXVEO0FBQ3pEOztBQUVBOztHQUVHOztBQUVIO0VBS0UsNEJBQTRCO0VBQzVCLHNCQUFzQjtBQUN4Qjs7QUFFQSxvQkFBb0I7O0FBQ3BCO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUdBO0VBQ0U7SUFDRSxXQUFXO0lBQ1gsbUNBQW1DO0lBQ25DLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsMkNBQTJDO0lBQzNDLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsOEJBQThCO0VBQ2hDOztFQUVBO0lBQ0UsbUJBQW1CO0VBQ3JCOztFQUVBO0lBS0UsMkJBQTJCO0VBQzdCOztFQUVBO0lBQ0UsU0FBUztFQUNYOztFQUVBO0lBQ0UsV0FBVztJQUNYLFlBQVk7SUFDWixjQUFjO0VBQ2hCOztFQUVBO0lBS0UsMkJBQTJCO0VBQzdCOzs7RUFHQTtJQUNFLGVBQWU7SUFDZixjQUFjO0lBQ2Qsa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0UsYUFBYTtJQUNiLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsMkNBQTJDO0VBQzdDOzs7RUFHQTtJQUNFO01BQ0UsVUFBVTtNQUNWLGdCQUFnQjtJQUNsQjtJQUNBO01BQ0UsVUFBVTtNQUNWLGdCQUFnQjtJQUNsQjtJQUNBO01BQ0UsVUFBVTtNQUNWLGdDQUFnQztJQUNsQztFQUNGOztBQUVGOztBQUdBOzs7RUFHRTtJQUNFLHNCQUFzQjtJQUN0QixnQ0FBZ0M7SUFLaEMsMkJBQTJCO0VBQzdCO0VBQ0E7SUFDRSxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGVBQWU7RUFDakI7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsWUFBWTtFQUNkOzs7RUFHQTtJQUNFLHNCQUFzQjtJQUN0QixxQkFBcUI7RUFDdkI7O0VBRUE7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCOztFQUVBO0lBQ0UsbUNBQW1DO0VBQ3JDOztFQUVBO0lBQ0UsZUFBZTs7RUFFakI7QUFDRjs7QUFHQTtFQUNFO0lBQ0UsTUFBTTtJQUNOLE1BQU07RUFDUjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxRQUFRO0VBQ1Y7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCO0FBQ0Y7O0FBR0E7O0VBRUU7SUFDRSxtQ0FBbUM7SUFDbkMsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixjQUFjO0VBQ2hCOztFQUVBO0lBQ0UscUJBQXFCO0VBQ3ZCO0VBQ0E7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFLRSwyQkFBMkI7RUFDN0I7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCOztBQUVGIiwiZmlsZSI6Im5hdmlnYXRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLnNpdGUtbmF2aWdhdGlvbiB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOjA7XG4gIGxlZnQ6MDtcbiAgd2lkdGg6IDEyMHB4O1xuICBoZWlnaHQ6IDEwMHZoO1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCB2YXIoLS1iYXNlLWNvbG9yMik7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgcGFkZGluZzogNDBweDtcbiAgLyogYmFja2dyb3VuZDogdmFyKC0tYmFzZS1jb2xvcjEpOyAqL1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuICB6LWluZGV4OiAyMDA7XG4gIG1pbi1oZWlnaHQ6IDYwMHB4O1xufVxuXG4uc2l0ZS1uYXZpZ2F0aW9uLmRhcmstbW9kZSB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWJhc2UtY29sb3IyKTtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjUpO1xufVxuXG5cbi5zaXRlLW5hdmlnYXRpb24ub3BlbiB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yKTtcbiAgY29sb3I6IHZhcigtLWJhc2UtY29sb3IxKTtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgdmFyKC0tYmFzZS1jb2xvcjEpO1xufVxuXG4ub3Blbi1zaXRlLW5hdmlnYXRpb24ge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDowO1xuICBoZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvcik7XG4gIHdpZHRoOiAxMDB2dztcbiAgbWFyZ2luLWxlZnQ6IC0xMDB2dztcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbi1vdXQ7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHotaW5kZXg6IDE5OTtcbn1cblxuXG4ub3Blbi1zaXRlLW5hdmlnYXRpb24udmlzaWJsZSB7XG4gIG1hcmdpbi1sZWZ0OjA7XG4gIGJveC1zaGFkb3c6IDVweCAwIDIwcHggcmdiYSgwLDAsMCwwLjIpO1xufVxuLnNjcmVlbi1tdWx0aW1vZGFsLW1lbnUge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG4ubW9iaWxlLW11bHRpbW9kYWwtbWVudSB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOjA7XG4gIG1hcmdpbi1ib3R0b206IDE1MHB4O1xuICBoZWlnaHQ6IGF1dG87XG4gIHdpZHRoOiAxMDAlO1xuICB0ZXh0LWFsaWduOmNlbnRlcjtcbn1cblxuLnNpdGUtbmF2aWdhdGlvbi10aXRsZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNDBweCwgLTUwJSkgcm90YXRlKC05MGRlZyk7XG4gIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTQwcHgsIC01MCUpIHJvdGF0ZSgtOTBkZWcpO1xuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNDBweCwgLTUwJSkgcm90YXRlKC05MGRlZyk7XG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNDBweCwgLTUwJSkgcm90YXRlKC05MGRlZyk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC00MHB4LCAtNTAlKSByb3RhdGUoLTkwZGVnKTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBib3R0b206IDh2aDtcbiAgbGVmdDowO1xuICBmb250LWZhbWlseTogdmFyKC0tYmFzZS1mb250LXRpdGxlKTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtbWVkaXVtKTtcbiAgaGVpZ2h0OiAxMjBweDtcbiAgd2lkdGg6IDIwMHB4O1xuICBsaW5lLWhlaWdodDogMTIwcHg7XG59XG5cblxuLm1lbnUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgb3ZlcmZsb3c6dmlzaWJsZTtcbiAgei1pbmRleDogMTAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5tZW51OjpiZWZvcmUsIC5tZW51OjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogMDtcbiAgYm9yZGVyLWJvdHRvbTogNHB4IHNvbGlkIHZhcigtLWJhc2UtY29sb3IyKTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG59XG5cbiNzaWRlYmFyLW1lbnUub3BlbiAubWVudTo6YmVmb3JlLFxuI3NpZGViYXItbWVudS5vcGVuIC5tZW51OjphZnRlcixcbiNzaWRlYmFyLW1lbnUuZGFyay1tb2RlIC5tZW51OjpiZWZvcmUsXG4jc2lkZWJhci1tZW51LmRhcmstbW9kZSAubWVudTo6YWZ0ZXIge1xuICBib3JkZXItYm90dG9tOiA0cHggc29saWQgdmFyKC0tYmFzZS1jb2xvcjEpO1xufVxuXG4ubWVudTo6YmVmb3JlIHtcbiAgdG9wOiAwO1xuICBsZWZ0OjA7XG59XG5cbi5tZW51OjphZnRlciB7XG4gIGJvdHRvbTogMnB4O1xuICByaWdodDogMDtcbn1cblxuLm1lbnUuaG92ZXJlZmZlY3Q6aG92ZXI6OmJlZm9yZSB7XG4gIHRvcDogM3B4O1xuICBsZWZ0OiA1cHg7XG59XG5cbi5tZW51LmhvdmVyZWZmZWN0OmhvdmVyOjphZnRlciB7XG4gIGJvdHRvbTogNXB4O1xuICByaWdodDogNXB4O1xufVxuXG4ubWVudS5ob3ZlcmVmZmVjdC5vcGVuOjpiZWZvcmUge1xuICB0b3A6IDhweCFpbXBvcnRhbnQ7XG4gIGxlZnQ6IDAhaW1wb3J0YW50O1xufVxuXG4ubWVudS5ob3ZlcmVmZmVjdC5vcGVuOjphZnRlciB7XG4gIHJpZ2h0OiAwcHghaW1wb3J0YW50O1xuICBib3R0b206IDhweCFpbXBvcnRhbnQ7XG59XG5cbi5tZW51OmFjdGl2ZTo6YmVmb3JlLCAubWVudS5vcGVuOjpiZWZvcmUge1xuICB0b3A6IDhweDtcbiAgbGVmdDogMDtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAtby10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbn1cblxuLm1lbnU6YWN0aXZlOjphZnRlciwgLm1lbnUub3Blbjo6YWZ0ZXIge1xuICBib3R0b206IDhweDtcbiAgcmlnaHQ6IDFweDtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xuICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XG4gIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xuICAtby10cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxMzVkZWcpO1xufVxuXG51bC5tZW51LWl0ZW1zIHtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjAlKTtcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwJSk7XG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwJSk7XG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02MCUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIHBhZGRpbmc6IDE1dmggdmFyKC0tY29udGVudC1tYXJnaW4pO1xuICBtYXJnaW46IDAgMCAwIDEyMHB4O1xuICB3aWR0aDogdmFyKC0td2luZG93LXdpZHRoKTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbiNvcGVuLW1lbnUuYW5pbWF0ZSB7XG4gIGFuaW1hdGlvbjogZmFkZUluTWVudSBlYXNlIDEuNXM7XG59XG5cbkBrZXlmcmFtZXMgZmFkZUluTWVudSB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIG1hcmdpbi1sZWZ0OiA2MHB4O1xuICB9XG4gIDIwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICBtYXJnaW4tbGVmdDogNjBweDtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS13aW5kb3ctbWFyZ2luKTtcbiAgfVxufVxuXG4jbWVudS1jb250YWN0LWRldGFpbHMuYW5pbWF0ZSB7XG4gIGFuaW1hdGlvbjogZmFkZUluQ29udGFjdERldGFpbHMgZWFzZSAycztcbn1cblxuQGtleWZyYW1lcyBmYWRlSW5Db250YWN0RGV0YWlscyB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIDUwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbnVsLm1lbnUtaXRlbXMgbGkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW46IDh2aCAxdnc7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cblxuLmZpbGwtdGV4dC1vbi1ob3ZlciB7XG4gIGNvbG9yOiB2YXIoLS1iYXNlLWNvbG9yMSk7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1iYXNlLWZvbnQtYm9keSk7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMi44dnc7XG4gIHBhZGRpbmc6MDtcbiAgbWFyZ2luOjA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtcmVuZGVyaW5nOiBnZW9tZXRyaWNQcmVjaXNpb247XG59XG5cbnVsLm1lbnUtaXRlbXMgbGkuaG92ZXJlZmZlY3QgLmZpbGwtdGV4dC1vbi1ob3ZlcjphZnRlcntcbiAgY29udGVudDogYXR0cihkYXRhLXRleHQpO1xuICB3aWR0aDowJTtcbiAgY29sb3I6IHZhcigtLWJhc2UtY29sb3IxKTtcbiAgcG9zaXRpb246YWJzb2x1dGU7XG4gIHRvcDowO1xuICBsZWZ0OjA7XG4gIG92ZXJmbG93OmhpZGRlbjtcbiAgdHJhbnNpdGlvbjogMC44cyBlYXNlLWluLW91dDtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWJhc2UtZm9udC1ib2R5KTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAyLjh2dztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdGV4dC1yZW5kZXJpbmc6IGdlb21ldHJpY1ByZWNpc2lvbjtcbn1cbnVsLm1lbnUtaXRlbXMgbGkuaG92ZXJlZmZlY3Q6aG92ZXIgLmZpbGwtdGV4dC1vbi1ob3ZlciB7XG4gIGNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LDAuMyk7XG59XG5cblxudWwubWVudS1pdGVtcyBsaS5ob3ZlcmVmZmVjdDpob3ZlciAuZmlsbC10ZXh0LW9uLWhvdmVyOmFmdGVyIHtcbiAgd2lkdGg6MTAwJTtcbn1cblxuLmNvbnRhY3QtZGV0YWlscyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IHZhcigtLXdpbmRvdy13aWR0aCk7XG4gIG1hcmdpbi1sZWZ0OiB2YXIoLS13aW5kb3ctbWFyZ2luKTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgbGVmdDowO1xuICBib3R0b206MDtcbiAgcGFkZGluZzogOHZoIHZhcigtLWNvbnRlbnQtbWFyZ2luKTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG51bC5zb2NpYWwtbWVkaWEtbGlzdCB7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIHBhZGRpbmc6IDEwcHggMDtcbiAgbWFyZ2luOjA7XG4gIHdpZHRoOiBhdXRvO1xuICBoZWlnaHQ6IGF1dG87XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1iYXNlLWZvbnQtdGl0bGUpO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBjb2xvcjogdmFyKC0tYmFzZS1jb2xvcjEpO1xuICBmb250LXNpemU6IDIycHg7XG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG59XG5cbnVsLnNvY2lhbC1tZWRpYS1saXN0IGxpIHtcbiAgbWFyZ2luOiAwIDEuNXZ3IDAgNXZ3O1xuICB3aWR0aDogYXV0bztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5cbi5lbWFpbC10ZXh0IHtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWJhc2UtZm9udC10aXRsZSk7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwLjVlbSAxLjV2dztcbiAgY29sb3I6IHZhcigtLWJhc2UtY29sb3IxKTtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbn1cblxuLmVtYWlsLXRleHQubWFpbCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC41KTtcbiAgZm9udC1mYW1pbHk6IHZhcigtLWJhc2UtZm9udC1ib2R5KTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIGN1cnNvcjpwb2ludGVyO1xufVxuXG4uZW1haWwtdGV4dDpob3ZlciAuYXJyb3ctbGluayB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBvcGFjaXR5OiAwLjU7XG59XG5cbi5lbWFpbC10ZXh0OmhvdmVyIC5hcnJvdy1saW5rLmhvdmVyZWZmZWN0IHtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIG9wYWNpdHk6IDE7XG59XG5cblxuLyogdG9nZ2xlIHN3aXRjaCAqL1xuLnRoZW1lLXRvZ2dsZS1zd2l0Y2gge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4udGhlbWUtc3RhdGUtaWNvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDI0cHg7XG4gIGhlaWdodDogMjRweDtcbiAgYmFja2dyb3VuZDogI2VlZTtcbiAgYm9yZGVyLXJhZGl1czogMjRweDtcbiAgbWFyZ2luOiAxNXB4IDhweDtcbn1cblxuLnRoZW1lLXN0YXRlLWljb246OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvcGFjaXR5OiAwO1xuICB3aWR0aDogMjRweDtcbiAgbGVmdDogMjBweDtcbiAgdG9wOiAtMjBweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1iYXNlLWNvbG9yMik7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuOHMgZWFzZTtcbiAgYm9yZGVyLXJhZGl1czogMjRweDtcbn1cblxuLnNpdGUtbmF2aWdhdGlvbi5vcGVuIC50aGVtZS1zdGF0ZS1pY29uOjphZnRlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yKTtcbn1cblxuLnRoZW1lLXN0YXRlLWljb24uZGFyay1tb2RlOjphZnRlciB7XG4gIGxlZnQ6IDdweDtcbiAgdG9wOiAtN3B4O1xuICBvcGFjaXR5OiAxO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGFuaW1hdGlvbjogbW92ZU92ZXIgMC43cyBlYXNlO1xuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxO1xufVxuXG5cbkBrZXlmcmFtZXMgbW92ZU92ZXIge1xuICAwJSB7XG4gICAgbGVmdDogMjBweDtcbiAgICB0b3A6IC0yMHB4O1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgMjAlIHtcbiAgICBsZWZ0OiAyMHB4O1xuICAgIHRvcDogLTIwcHg7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICAxMDAlIHtcbiAgICBsZWZ0OiA3cHg7XG4gICAgdG9wOiAtN3B4O1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuLnN3aXRjaCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBtYXJnaW46IDAgMTBweDtcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLyogSGlkZSBkZWZhdWx0IEhUTUwgY2hlY2tib3ggKi9cbi5zd2l0Y2ggaW5wdXQge1xuICBvcGFjaXR5OiAwO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xufVxuXG4vKiBUaGUgc2xpZGVyICovXG4uc2xpZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAuNHM7XG4gIC1tb3otdHJhbnNpdGlvbjogLjRzO1xuICAtbXMtdHJhbnNpdGlvbjogLjRzO1xuICAtby10cmFuc2l0aW9uOiAuNHM7XG4gIHRyYW5zaXRpb246IC40cztcbiAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCA1cHggcmdiYSgwLDAsMCwwLjMpO1xufVxuXG4uc2xpZGVyOmJlZm9yZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgY29udGVudDogXCJcIjtcbiAgaGVpZ2h0OiAyMHB4O1xuICB3aWR0aDogMjBweDtcbiAgYm94LXNoYWRvdzogMHB4IDBweCA1cHggcmdiYSgwLDAsMCwwLjMpO1xuICBsZWZ0OiAwcHg7XG4gIGJvdHRvbTogMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAuNHM7XG4gIC1tb3otdHJhbnNpdGlvbjogLjRzO1xuICAtbXMtdHJhbnNpdGlvbjogLjRzO1xuICAtby10cmFuc2l0aW9uOiAuNHM7XG4gIHRyYW5zaXRpb246IC40cztcbn1cblxuaW5wdXQ6Y2hlY2tlZCArIC5zbGlkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDE1cHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xufVxuXG4vKiBpbnB1dDpmb2N1cyArIC5zbGlkZXIge1xuICBib3gtc2hhZG93OiAwIDAgMXB4ICMyMTk2RjM7XG59ICovXG5cbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOmJlZm9yZSB7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTtcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMwcHgpO1xuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTtcbiAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ0NDtcbn1cblxuLyogUm91bmRlZCBzbGlkZXJzICovXG4uc2xpZGVyLnJvdW5kIHtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbn1cblxuLnNsaWRlci5yb3VuZDpiZWZvcmUge1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG5cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTQwMHB4KSB7XG4gIC5zaXRlLW5hdmlnYXRpb24ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmc6IDQ1cHggdmFyKC0tY29udGVudC1tYXJnaW4pO1xuICAgIGhlaWdodDogMTEwcHg7XG4gICAgbWluLWhlaWdodDogNTBweDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYmFzZS1jb2xvcjIpO1xuICAgIGJvcmRlci1yaWdodDogbm9uZTtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhc2UtY29sb3IxKTtcbiAgfVxuXG4gIC50aGVtZS10b2dnbGUtc3dpdGNoIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICB9XG5cbiAgLnRoZW1lLXN0YXRlLWljb24ge1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02OCUpO1xuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02OCUpO1xuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTY4JSk7XG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02OCUpO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjglKTtcbiAgfVxuXG4gIHVsLm1lbnUtaXRlbXMge1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIC5zd2l0Y2gge1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICBtYXJnaW46IDAgMTBweDtcbiAgfVxuXG4gIGlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOmJlZm9yZSB7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzBweCk7XG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzBweCk7XG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgzMHB4KTtcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMzBweCk7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDMwcHgpO1xuICB9XG5cblxuICAub3Blbi1zaXRlLW5hdmlnYXRpb24ge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgICBtYXJnaW4tdG9wOiAtMTAwdmg7XG4gIH1cblxuICAub3Blbi1zaXRlLW5hdmlnYXRpb24udmlzaWJsZSB7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgfVxuXG4gIC5zaXRlLW5hdmlnYXRpb24ub3BlbiwgLnNpdGUtbmF2aWdhdGlvbi5kYXJrLW1vZGUge1xuICAgIGJvcmRlci1yaWdodDogbm9uZTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYmFzZS1jb2xvcjEpO1xuICB9XG5cblxuICBAa2V5ZnJhbWVzIGZhZGVJbk1lbnUge1xuICAgIDAlIHtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICBtYXJnaW4tdG9wOiA2MHB4O1xuICAgIH1cbiAgICAyMCUge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIG1hcmdpbi10b3A6IDYwcHg7XG4gICAgfVxuICAgIDEwMCUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIG1hcmdpbi10b3A6IHZhcigtLXdpbmRvdy1tYXJnaW4pO1xuICAgIH1cbiAgfVxuXG59XG5cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAwMHB4KSB7XG5cblxuICB1bC5tZW51LWl0ZW1zIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHBhZGRpbmc6IDAgdmFyKC0tY29udGVudC1tYXJnaW4pO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgfVxuICB1bC5tZW51LWl0ZW1zIGxpIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luOiAzLjV2aCAwO1xuICB9XG5cbiAgLmZpbGwtdGV4dC1vbi1ob3ZlciB7XG4gICAgZm9udC1zaXplOiA1dnc7XG4gIH1cblxuICAuZmlsbC10ZXh0LW9uLWhvdmVyOmFmdGVyIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgI21lbnUtY29udGFjdC1kZXRhaWxzIHtcbiAgICBkaXNwbGF5Om5vbmU7XG4gIH1cblxuXG4gIC5jb250YWN0LWRldGFpbHMge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OnVuc2V0O1xuICB9XG5cbiAgdWwuc29jaWFsLW1lZGlhLWxpc3Qge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cblxuICB1bC5zb2NpYWwtbWVkaWEtbGlzdCBsaSB7XG4gICAgbWFyZ2luOiAyMHB4IDA7XG4gIH1cblxuICAuc2l0ZS1uYXZpZ2F0aW9uIHtcbiAgICBwYWRkaW5nOiA0NXB4IHZhcigtLWNvbnRlbnQtbWFyZ2luKTtcbiAgfVxuXG4gIC5lbWFpbC10ZXh0LCB1bC5zb2NpYWwtbWVkaWEtbGlzdCB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuXG4gIH1cbn1cblxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5MDBweCkge1xuICAubWVudS5ob3ZlcmVmZmVjdDpob3Zlcjo6YmVmb3JlIHtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDowO1xuICB9XG5cbiAgLm1lbnUuaG92ZXJlZmZlY3Q6aG92ZXI6OmFmdGVyIHtcbiAgICBib3R0b206IDJweDtcbiAgICByaWdodDogMDtcbiAgfVxuXG4gIC5maWxsLXRleHQtb24taG92ZXIge1xuICAgIGZvbnQtc2l6ZTogNnZ3O1xuICB9XG59XG5cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzAwcHgpIHtcblxuICAuc2l0ZS1uYXZpZ2F0aW9uIHtcbiAgICBwYWRkaW5nOiA0NHB4IHZhcigtLWNvbnRlbnQtbWFyZ2luKTtcbiAgICBoZWlnaHQ6IDkwcHg7XG4gICAgbWFyZ2luLXRvcDogLTE1cHg7XG4gICAgcG9zaXRpb246Zml4ZWQ7XG4gIH1cblxuICAubW9iaWxlLW11bHRpbW9kYWwtbWVudSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB9XG4gIC5zY3JlZW4tbXVsdGltb2RhbC1tZW51IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgdWwubWVudS1pdGVtcyB7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTU1JSk7XG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTU1JSk7XG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTUlKTtcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTU1JSk7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01NSUpO1xuICB9XG5cbiAgLmZpbGwtdGV4dC1vbi1ob3ZlciB7XG4gICAgZm9udC1zaXplOiA3dnc7XG4gIH1cblxufVxuIl19 */"] });


/***/ }),

/***/ "rE4P":
/*!***************************************************************!*\
  !*** ./src/app/components/multimodal/multimodal.component.ts ***!
  \***************************************************************/
/*! exports provided: MultimodalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultimodalComponent", function() { return MultimodalComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_voice_control_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/voice-control.service */ "vjam");
/* harmony import */ var src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/multimodal.service */ "bTnw");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var ng_inline_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-inline-svg */ "e8Ap");







function MultimodalComponent_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MultimodalComponent_div_1_div_1_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7); const modality_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r5.selectModality(modality_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const modality_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("id", modality_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate2"]("title", "turn on ", modality_r2.name, " feedback/control (", modality_r2.accelerator, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("inlineSVG", modality_r2.icon);
} }
function MultimodalComponent_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MultimodalComponent_div_1_div_2_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const modality_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r9.selectModality(modality_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const modality_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("id", modality_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate2"]("title", "turn off ", modality_r2.name, " feedback/control (", modality_r2.accelerator, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("inlineSVG", modality_r2.active_icon);
} }
function MultimodalComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MultimodalComponent_div_1_div_1_Template, 1, 4, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, MultimodalComponent_div_1_div_2_Template, 1, 4, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const modality_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !modality_r2.active);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", modality_r2.active);
} }
const _c0 = function (a0) { return { darkMode: a0 }; };
function MultimodalComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MultimodalComponent_div_2_Template_div_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r13.speak(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MultimodalComponent_div_2_Template_div_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r14); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r15.activateSpeechRecognition(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](9, _c0, ctx_r1.config.theme === "dark-mode"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](11, _c0, ctx_r1.config.theme === "dark-mode"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("inlineSVG", "/assets/images/voice-active.svg");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](13, _c0, ctx_r1.config.theme === "dark-mode"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.speechData);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](15, _c0, ctx_r1.config.theme === "dark-mode"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.speechOutput);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](17, _c0, ctx_r1.config.theme === "dark-mode"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("inlineSVG", "/assets/images/audio-active.svg");
} }
class MultimodalComponent {
    constructor(document, voiceControlService, multimodalService, router) {
        this.document = document;
        this.voiceControlService = voiceControlService;
        this.multimodalService = multimodalService;
        this.router = router;
        this.voiceControl = false;
        this.speechData = "";
        this.config = this.multimodalService.config;
        this.voiceControlService.config = this.config;
        this.voiceControlService.updateModality.subscribe(res => {
            let modality = this.config.modalities.filter(m => m.name === res.modality)[0];
            if (modality.active !== res.state) {
                this.document.getElementById(modality.name).click();
            }
        });
    }
    keyEvent(event) {
        event.stopImmediatePropagation();
        const key = event.key;
        if (!this.config.inputFocus) {
            if (key === 's') {
                this.document.getElementById(this.config.modalities[3].name).click();
            }
            else if (key === 'm') {
                this.document.getElementById(this.config.modalities[2].name).click();
            }
            else if (key === 'h') {
                this.document.getElementById(this.config.modalities[0].name).click();
            }
            else if (key === 'v') {
                this.document.getElementById(this.config.modalities[1].name).click();
            }
        }
    }
    navigateTo(link) {
        this.router.navigate(['', link]);
        window.scrollTo(0, 0);
        this.hideImagePreview();
    }
    hideImagePreview() {
        this.document.getElementById('image-cursor').style.backgroundImage = 'none';
        this.document.getElementById('image-cursor').style.opacity = '0';
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.multimodalService.loadAudio();
    }
    selectModality(modality) {
        modality.active = !modality.active;
        this.multimodalService.playAudioClick();
        this.multimodalService.playHapticButtonClick(100);
        if (modality.name === 'speech') {
            if (modality.active) {
                this.voiceControl = true;
                setTimeout(() => {
                    this.voiceControlService.initializeSpeechRecognition();
                }, 100);
            }
            else {
                this.voiceControlService.disableSpeechRecognition();
                this.voiceControl = false;
            }
        }
        this.voiceControlService.config = this.config;
    }
    activateSpeechRecognition() {
        this.voiceControlService.activateSpeechRecognition();
    }
    speak() {
        this.voiceControlService.genericMessage();
    }
    updateTheme(theme) {
        this.multimodalService.config.theme = theme;
        this.multimodalService.updateTheme(this.multimodalService.config.theme);
    }
}
MultimodalComponent.ɵfac = function MultimodalComponent_Factory(t) { return new (t || MultimodalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_voice_control_service__WEBPACK_IMPORTED_MODULE_2__["VoiceControlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_multimodal_service__WEBPACK_IMPORTED_MODULE_3__["MultimodalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"])); };
MultimodalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MultimodalComponent, selectors: [["app-multimodal"]], hostBindings: function MultimodalComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keyup", function MultimodalComponent_keyup_HostBindingHandler($event) { return ctx.keyEvent($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
    } }, decls: 10, vars: 2, consts: [[1, "modalities-menu"], ["class", "modalities-item buttonEl", 4, "ngFor", "ngForOf"], ["class", "voice-input", 3, "ngClass", 4, "ngIf"], ["id", "audio-click", "src", "../../../assets/audio/subtle-click.wav"], ["id", "audio-slide", "src", "../../../assets/audio/door-slide.wav"], ["id", "audio-slide-click", "src", "../../../assets/audio/slide-click.wav"], ["id", "audio-gate-latch-click", "src", "../../../assets/audio/gate-latch-click.wav"], ["id", "audio-hard-click", "src", "../../../assets/audio/hard-click.wav"], ["id", "audio-on-off-light-switch", "src", "../../../assets/audio/on-or-off-light-switch-tap.wav"], ["id", "audio-lock-sound", "src", "../../../assets/audio/lock-sound.wav"], [1, "modalities-item", "buttonEl"], ["class", "buttonEl modality-svg div-container-element", 3, "id", "inlineSVG", "title", "click", 4, "ngIf"], [1, "buttonEl", "modality-svg", "div-container-element", 3, "id", "inlineSVG", "title", "click"], [1, "voice-input", 3, "ngClass"], [1, "modality-svg", "modalities-item-speech-balloon", 3, "ngClass"], [3, "inlineSVG", "click"], ["id", "speech-balloon", 1, "speech-balloon", "hideEarSide", 3, "ngClass"], ["id", "speech-input"], ["id", "speech-output", 3, "ngClass"], [1, "listening", 3, "inlineSVG", "click"], ["id", "audio-input", 1, "voiceInputBars"], ["id", "bar1", 1, "bar"], ["id", "bar2", 1, "bar"], ["id", "bar3", 1, "bar"], ["id", "bar4", 1, "bar"], ["id", "bar5", 1, "bar"]], template: function MultimodalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MultimodalComponent_div_1_Template, 3, 2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, MultimodalComponent_div_2_Template, 16, 19, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "audio", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "audio", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "audio", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "audio", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "audio", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "audio", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "audio", 9);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.config.modalities);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.voiceControl);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgIf"], ng_inline_svg__WEBPACK_IMPORTED_MODULE_5__["InlineSVGDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["NgClass"]], styles: ["img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n}\n\n.modalities-menu[_ngcontent-%COMP%] {\n  display: inline-flex;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -67%);\n  width: auto;\n  height: auto;\n  flex-direction: column;\n  margin: 30px auto;\n  z-index: 100;\n}\n\n.modalities-item[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.voice-input[_ngcontent-%COMP%] {\n  position: fixed;\n  display:flex;\n  flex-direction: row;\n  left: calc(50% - 60px);\n  margin: 0;\n  margin-left: var(--window-margin);\n  padding: 0;\n  top: 30px;\n  width: 600px;\n  min-height: 100px;\n  transform: translateX(-50%);\n  z-index: 100;\n  justify-content: space-evenly;\n}\n\n.speech-balloon[_ngcontent-%COMP%] {\n  position: relative;\n  align-self:center;\n  background: #f5f5f5;\n  width: 80%;\n  height: 100%;\n  min-height: 60px;\n  border-radius: 15px;\n  font-family: var(--base-font-title);\n  font-size: 20px;\n  font-weight: 500;\n  text-transform: uppercase;\n  color: #000;\n  padding: 15px 20px;\n  box-sizing: border-box;\n  margin: 0;\n}\n\n.speech-balloon.darkMode[_ngcontent-%COMP%] {\n  background: #333;\n  color: #ccc;\n}\n\n.speech-balloon[_ngcontent-%COMP%]:before, .speech-balloon[_ngcontent-%COMP%]:after {\n  content: \"\";\n  position: absolute;\n  display: block;\n  border-top: 12px solid transparent;\n  border-bottom: 12px solid transparent;\n  top: 50%;\n  margin-top: -12px;\n}\n\n.speech-balloon[_ngcontent-%COMP%]:before {\n  border-right: 12px solid #f5f5f5;\n  left: -12px;\n}\n\n.speech-balloon[_ngcontent-%COMP%]:after {\n  border-left: 12px solid #f5f5f5;\n  left: 100%;\n}\n\n.speech-balloon.darkMode[_ngcontent-%COMP%]:before {\n  border-right: 12px solid #333;\n}\n\n.speech-balloon.darkMode[_ngcontent-%COMP%]:after {\n  border-left: 12px solid #333;\n}\n\n.modalities-item-speech-balloon[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  width: 90px;\n  height: auto;\n}\n\n.modalities-item-speech-balloon[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  position: absolute;\n  display: inline-block;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 70px;\n  height: 70px;\n  -webkit-tap-highlight-color: transparent;\n}\n\ninput[_ngcontent-%COMP%] {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  background: none;\n  border: none;\n  font-family: var(--base-font-title);\n  font-size: 20px;\n  font-weight: 500;\n  text-transform: uppercase;\n  color: #000;\n  padding: 15px 20px;\n  margin:0;\n  pointer-events: none;\n}\n\ninput[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border: none;\n}\n\n#speech-input[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n#speech-output[_ngcontent-%COMP%] {\n  text-align: left;\n  color: var(--color);\n}\n\n#speech-output.darkMode[_ngcontent-%COMP%] {\n  color: var(--color3);\n}\n\n.voiceInputBars[_ngcontent-%COMP%] {\n  display: inline-flex!important;\n  width: 50px!important;\n  height: auto!important;\n  position: absolute!important;\n  right: -25px;\n  flex-direction: column!important;\n  top: 50%;\n  transform: translateY(-50%);\n  transition: opacity 0.5s ease;\n}\n\n.bar[_ngcontent-%COMP%] {\n  position: relative;\n  left: -8px!important;\n  width: 3px;\n  max-width: 50px;\n  border-top: 4px solid #ccc;\n  background: #eee!important;\n  margin: 3px 0 2px!important;\n}\n\n@media screen and (max-width: 1400px) {\n  .modalities-menu[_ngcontent-%COMP%] {\n    top: 0;\n    transform: translate(-50%, -15%);\n    flex-direction: row;\n  }\n\n  .voice-input[_ngcontent-%COMP%] {\n    left: 0;\n    width: 100%;\n    top: var(--top-margin-menu);\n    min-height: 50px;\n    margin-top: 0px;\n    transform: none;\n    background: #fff;\n  }\n\n  .voice-input.darkMode[_ngcontent-%COMP%] {\n    background: var(--base-color2);\n  }\n\n  .speech-balloon[_ngcontent-%COMP%] {\n    \n    min-height: 40px;\n    border-radius: 0;\n    font-size: 19px;\n    text-transform: uppercase;\n    padding: 15px 20px;\n    margin: 3px 0 3px;\n  }\n\n  .speech-balloon[_ngcontent-%COMP%]:before, .speech-balloon[_ngcontent-%COMP%]:after {\n    display: none;\n  }\n\n  .modalities-item-speech-balloon[_ngcontent-%COMP%] {\n    width: var(--content-margin);\n  }\n  .modalities-item-speech-balloon[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    width: 60px;\n    height: 60px;\n    left: 50%;\n    transform: translate(-50%, -50%);\n  }\n\n  .modalities-item-speech-balloon[_ngcontent-%COMP%] {\n    background: #fff;\n  }\n  .modalities-item-speech-balloon.darkMode[_ngcontent-%COMP%] {\n    background: var(--base-color2);\n  }\n\n  .bar[_ngcontent-%COMP%] {\n    border-top: 3px solid #ccc;\n    left: -5px !important;\n  }\n\n  .voiceInputBars[_ngcontent-%COMP%] {\n    right: -10px;\n  }\n\n\n  input[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n\n\n}\n\n@media screen and (max-width: 1000px) {\n  .bar[_ngcontent-%COMP%] {\n    border-top: 2px solid #ccc;\n    left: 6.5vw !important;\n    max-width: 10px;\n    margin: 2px 0 1px!important;\n  }\n\n  .voiceInputBars[_ngcontent-%COMP%] {\n    right: 15px;\n  }\n\n  .voice-input[_ngcontent-%COMP%] {\n    min-height: 40px;\n  }\n\n  .speech-balloon[_ngcontent-%COMP%] {\n    width: 70vw;\n    padding: 8px 15px;\n    font-size: 16px;\n  }\n  .modalities-item-speech-balloon[_ngcontent-%COMP%] {\n    width: 12vw;\n  }\n  .modalities-item-speech-balloon[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    height: 40px;\n    width: 40px;\n  }\n\n  .modalities-item[_ngcontent-%COMP%] {\n    width: 65px;\n    height: 65px;\n  }\n}\n\n@media screen and (max-width: 800px) {\n  .voiceInputBars[_ngcontent-%COMP%] {\n    right: -5px;\n  }\n\n  .voice-input[_ngcontent-%COMP%] {\n    margin-top:0;\n  }\n\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm11bHRpbW9kYWwuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxRQUFRO0VBS1IsZ0NBQWdDO0VBQ2hDLFdBQVc7RUFDWCxZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLGlCQUFpQjtFQUNqQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGVBQWU7RUFDZix3Q0FBd0M7QUFDMUM7O0FBR0E7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsU0FBUztFQUNULGlDQUFpQztFQUNqQyxVQUFVO0VBQ1YsU0FBUztFQUNULFlBQVk7RUFDWixpQkFBaUI7RUFLakIsMkJBQTJCO0VBQzNCLFlBQVk7RUFDWiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixVQUFVO0VBQ1YsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsbUNBQW1DO0VBQ25DLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxrQ0FBa0M7RUFDbEMscUNBQXFDO0VBQ3JDLFFBQVE7RUFDUixpQkFBaUI7QUFDbkI7O0FBQ0E7RUFDRSxnQ0FBZ0M7RUFDaEMsV0FBVztBQUNiOztBQUVBO0VBQ0UsK0JBQStCO0VBQy9CLFVBQVU7QUFDWjs7QUFFQTtFQUNFLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFLQTtFQUNFLGtCQUFrQjtFQUNsQixvQkFBb0I7RUFDcEIsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIsUUFBUTtFQUtSLDJCQUEyQjtFQUMzQixXQUFXO0VBQ1gsWUFBWTtFQUNaLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osbUNBQW1DO0VBQ25DLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsOEJBQThCO0VBQzlCLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIsNEJBQTRCO0VBQzVCLFlBQVk7RUFDWixnQ0FBZ0M7RUFDaEMsUUFBUTtFQUNSLDJCQUEyQjtFQUMzQiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLFVBQVU7RUFDVixlQUFlO0VBQ2YsMEJBQTBCO0VBQzFCLDBCQUEwQjtFQUMxQiwyQkFBMkI7QUFDN0I7O0FBSUE7RUFDRTtJQUNFLE1BQU07SUFLTixnQ0FBZ0M7SUFDaEMsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsT0FBTztJQUNQLFdBQVc7SUFDWCwyQkFBMkI7SUFDM0IsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFLZixlQUFlO0lBQ2YsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0UsOEJBQThCO0VBQ2hDOztFQUVBO0lBQ0UsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixrQkFBa0I7SUFDbEIsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsNEJBQTRCO0VBQzlCO0VBQ0E7SUFDRSxXQUFXO0lBQ1gsWUFBWTtJQUNaLFNBQVM7SUFLVCxnQ0FBZ0M7RUFDbEM7O0VBRUE7SUFDRSxnQkFBZ0I7RUFDbEI7RUFDQTtJQUNFLDhCQUE4QjtFQUNoQzs7RUFFQTtJQUNFLDBCQUEwQjtJQUMxQixxQkFBcUI7RUFDdkI7O0VBRUE7SUFDRSxZQUFZO0VBQ2Q7OztFQUdBO0lBQ0UsZUFBZTtFQUNqQjs7O0FBR0Y7O0FBRUE7RUFDRTtJQUNFLDBCQUEwQjtJQUMxQixzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLDJCQUEyQjtFQUM3Qjs7RUFFQTtJQUNFLFdBQVc7RUFDYjs7RUFFQTtJQUNFLGdCQUFnQjtFQUNsQjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxpQkFBaUI7SUFDakIsZUFBZTtFQUNqQjtFQUNBO0lBQ0UsV0FBVztFQUNiO0VBQ0E7SUFDRSxZQUFZO0lBQ1osV0FBVztFQUNiOztFQUVBO0lBQ0UsV0FBVztJQUNYLFlBQVk7RUFDZDtBQUNGOztBQUdBO0VBQ0U7SUFDRSxXQUFXO0VBQ2I7O0VBRUE7SUFDRSxZQUFZO0VBQ2Q7O0FBRUYiLCJmaWxlIjoibXVsdGltb2RhbC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLm1vZGFsaXRpZXMtbWVudSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwJTtcbiAgdG9wOiA1MCU7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTY3JSk7XG4gIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTY3JSk7XG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC02NyUpO1xuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTY3JSk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC02NyUpO1xuICB3aWR0aDogYXV0bztcbiAgaGVpZ2h0OiBhdXRvO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBtYXJnaW46IDMwcHggYXV0bztcbiAgei1pbmRleDogMTAwO1xufVxuXG4ubW9kYWxpdGllcy1pdGVtIHtcbiAgd2lkdGg6IDgwcHg7XG4gIGhlaWdodDogODBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG5cbi52b2ljZS1pbnB1dCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgZGlzcGxheTpmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBsZWZ0OiBjYWxjKDUwJSAtIDYwcHgpO1xuICBtYXJnaW46IDA7XG4gIG1hcmdpbi1sZWZ0OiB2YXIoLS13aW5kb3ctbWFyZ2luKTtcbiAgcGFkZGluZzogMDtcbiAgdG9wOiAzMHB4O1xuICB3aWR0aDogNjAwcHg7XG4gIG1pbi1oZWlnaHQ6IDEwMHB4O1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICB6LWluZGV4OiAxMDA7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xufVxuXG4uc3BlZWNoLWJhbGxvb24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGFsaWduLXNlbGY6Y2VudGVyO1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICB3aWR0aDogODAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDYwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1iYXNlLWZvbnQtdGl0bGUpO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGNvbG9yOiAjMDAwO1xuICBwYWRkaW5nOiAxNXB4IDIwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG1hcmdpbjogMDtcbn1cblxuLnNwZWVjaC1iYWxsb29uLmRhcmtNb2RlIHtcbiAgYmFja2dyb3VuZDogIzMzMztcbiAgY29sb3I6ICNjY2M7XG59XG5cbi5zcGVlY2gtYmFsbG9vbjpiZWZvcmUsIC5zcGVlY2gtYmFsbG9vbjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJvcmRlci10b3A6IDEycHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1ib3R0b206IDEycHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIHRvcDogNTAlO1xuICBtYXJnaW4tdG9wOiAtMTJweDtcbn1cbi5zcGVlY2gtYmFsbG9vbjpiZWZvcmUge1xuICBib3JkZXItcmlnaHQ6IDEycHggc29saWQgI2Y1ZjVmNTtcbiAgbGVmdDogLTEycHg7XG59XG5cbi5zcGVlY2gtYmFsbG9vbjphZnRlciB7XG4gIGJvcmRlci1sZWZ0OiAxMnB4IHNvbGlkICNmNWY1ZjU7XG4gIGxlZnQ6IDEwMCU7XG59XG5cbi5zcGVlY2gtYmFsbG9vbi5kYXJrTW9kZTpiZWZvcmUge1xuICBib3JkZXItcmlnaHQ6IDEycHggc29saWQgIzMzMztcbn1cblxuLnNwZWVjaC1iYWxsb29uLmRhcmtNb2RlOmFmdGVyIHtcbiAgYm9yZGVyLWxlZnQ6IDEycHggc29saWQgIzMzMztcbn1cblxuXG5cblxuLm1vZGFsaXRpZXMtaXRlbS1zcGVlY2gtYmFsbG9vbiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIHdpZHRoOiA5MHB4O1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi5tb2RhbGl0aWVzLWl0ZW0tc3BlZWNoLWJhbGxvb24gZGl2IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHRvcDogNTAlO1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICB3aWR0aDogNzBweDtcbiAgaGVpZ2h0OiA3MHB4O1xuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG5pbnB1dCB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1iYXNlLWZvbnQtdGl0bGUpO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGNvbG9yOiAjMDAwO1xuICBwYWRkaW5nOiAxNXB4IDIwcHg7XG4gIG1hcmdpbjowO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG59XG5cbiNzcGVlY2gtaW5wdXQge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cblxuI3NwZWVjaC1vdXRwdXQge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBjb2xvcjogdmFyKC0tY29sb3IpO1xufVxuXG4jc3BlZWNoLW91dHB1dC5kYXJrTW9kZSB7XG4gIGNvbG9yOiB2YXIoLS1jb2xvcjMpO1xufVxuXG4udm9pY2VJbnB1dEJhcnMge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleCFpbXBvcnRhbnQ7XG4gIHdpZHRoOiA1MHB4IWltcG9ydGFudDtcbiAgaGVpZ2h0OiBhdXRvIWltcG9ydGFudDtcbiAgcG9zaXRpb246IGFic29sdXRlIWltcG9ydGFudDtcbiAgcmlnaHQ6IC0yNXB4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uIWltcG9ydGFudDtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XG59XG5cbi5iYXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6IC04cHghaW1wb3J0YW50O1xuICB3aWR0aDogM3B4O1xuICBtYXgtd2lkdGg6IDUwcHg7XG4gIGJvcmRlci10b3A6IDRweCBzb2xpZCAjY2NjO1xuICBiYWNrZ3JvdW5kOiAjZWVlIWltcG9ydGFudDtcbiAgbWFyZ2luOiAzcHggMCAycHghaW1wb3J0YW50O1xufVxuXG5cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTQwMHB4KSB7XG4gIC5tb2RhbGl0aWVzLW1lbnUge1xuICAgIHRvcDogMDtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC0xNSUpO1xuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTE1JSk7XG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTE1JSk7XG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC0xNSUpO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC0xNSUpO1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIH1cblxuICAudm9pY2UtaW5wdXQge1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdG9wOiB2YXIoLS10b3AtbWFyZ2luLW1lbnUpO1xuICAgIG1pbi1oZWlnaHQ6IDUwcHg7XG4gICAgbWFyZ2luLXRvcDogMHB4O1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBub25lO1xuICAgIC1tb3otdHJhbnNmb3JtOiBub25lO1xuICAgIC1vLXRyYW5zZm9ybTogbm9uZTtcbiAgICAtbXMtdHJhbnNmb3JtOiBub25lO1xuICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICB9XG5cbiAgLnZvaWNlLWlucHV0LmRhcmtNb2RlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYXNlLWNvbG9yMik7XG4gIH1cblxuICAuc3BlZWNoLWJhbGxvb24ge1xuICAgIC8qIHdpZHRoOiA4M3Z3OyAqL1xuICAgIG1pbi1oZWlnaHQ6IDQwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICBmb250LXNpemU6IDE5cHg7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBwYWRkaW5nOiAxNXB4IDIwcHg7XG4gICAgbWFyZ2luOiAzcHggMCAzcHg7XG4gIH1cblxuICAuc3BlZWNoLWJhbGxvb246YmVmb3JlLCAuc3BlZWNoLWJhbGxvb246YWZ0ZXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAubW9kYWxpdGllcy1pdGVtLXNwZWVjaC1iYWxsb29uIHtcbiAgICB3aWR0aDogdmFyKC0tY29udGVudC1tYXJnaW4pO1xuICB9XG4gIC5tb2RhbGl0aWVzLWl0ZW0tc3BlZWNoLWJhbGxvb24gZGl2IHtcbiAgICB3aWR0aDogNjBweDtcbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgbGVmdDogNTAlO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIH1cblxuICAubW9kYWxpdGllcy1pdGVtLXNwZWVjaC1iYWxsb29uIHtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICB9XG4gIC5tb2RhbGl0aWVzLWl0ZW0tc3BlZWNoLWJhbGxvb24uZGFya01vZGUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJhc2UtY29sb3IyKTtcbiAgfVxuXG4gIC5iYXIge1xuICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCAjY2NjO1xuICAgIGxlZnQ6IC01cHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC52b2ljZUlucHV0QmFycyB7XG4gICAgcmlnaHQ6IC0xMHB4O1xuICB9XG5cblxuICBpbnB1dCB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICB9XG5cblxufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMDAwcHgpIHtcbiAgLmJhciB7XG4gICAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICNjY2M7XG4gICAgbGVmdDogNi41dncgIWltcG9ydGFudDtcbiAgICBtYXgtd2lkdGg6IDEwcHg7XG4gICAgbWFyZ2luOiAycHggMCAxcHghaW1wb3J0YW50O1xuICB9XG5cbiAgLnZvaWNlSW5wdXRCYXJzIHtcbiAgICByaWdodDogMTVweDtcbiAgfVxuXG4gIC52b2ljZS1pbnB1dCB7XG4gICAgbWluLWhlaWdodDogNDBweDtcbiAgfVxuXG4gIC5zcGVlY2gtYmFsbG9vbiB7XG4gICAgd2lkdGg6IDcwdnc7XG4gICAgcGFkZGluZzogOHB4IDE1cHg7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG4gIC5tb2RhbGl0aWVzLWl0ZW0tc3BlZWNoLWJhbGxvb24ge1xuICAgIHdpZHRoOiAxMnZ3O1xuICB9XG4gIC5tb2RhbGl0aWVzLWl0ZW0tc3BlZWNoLWJhbGxvb24gZGl2IHtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgd2lkdGg6IDQwcHg7XG4gIH1cblxuICAubW9kYWxpdGllcy1pdGVtIHtcbiAgICB3aWR0aDogNjVweDtcbiAgICBoZWlnaHQ6IDY1cHg7XG4gIH1cbn1cblxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4MDBweCkge1xuICAudm9pY2VJbnB1dEJhcnMge1xuICAgIHJpZ2h0OiAtNXB4O1xuICB9XG5cbiAgLnZvaWNlLWlucHV0IHtcbiAgICBtYXJnaW4tdG9wOjA7XG4gIH1cblxufVxuIl19 */"] });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_contact_contact_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/contact/contact.component */ "G2Gn");
/* harmony import */ var _components_frontpage_frontpage_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/frontpage/frontpage.component */ "2CWi");
/* harmony import */ var _components_publications_publications_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/publications/publications.component */ "BBdW");
/* harmony import */ var _components_teaching_teaching_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/teaching/teaching.component */ "b6yF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    { path: '', component: _components_frontpage_frontpage_component__WEBPACK_IMPORTED_MODULE_2__["FrontpageComponent"], pathMatch: 'full' },
    { path: 'teaching', component: _components_teaching_teaching_component__WEBPACK_IMPORTED_MODULE_4__["TeachingComponent"], pathMatch: 'full' },
    { path: 'publications', component: _components_publications_publications_component__WEBPACK_IMPORTED_MODULE_3__["PublicationsComponent"], pathMatch: 'full' },
    { path: 'contact', component: _components_contact_contact_component__WEBPACK_IMPORTED_MODULE_1__["ContactComponent"], pathMatch: 'full' }
    // { path: ':id', component: SinglePageComponent, data: { state: 'id'}, pathMatch: 'full'}
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "vjam":
/*!***************************************************!*\
  !*** ./src/app/services/voice-control.service.ts ***!
  \***************************************************/
/*! exports provided: VoiceControlService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoiceControlService", function() { return VoiceControlService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _navigator_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navigator.service */ "ec3T");




class VoiceControlService {
    constructor(document, navigatorService) {
        this.document = document;
        this.navigatorService = navigatorService;
        this.recognition = null;
        this.recognizing = false;
        this.first = true;
        this.supported = false;
        this.utter = new SpeechSynthesisUtterance();
        this.synth = window.speechSynthesis;
        this.updateSpeechOutput = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.link = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.updateModality = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.changeTheme = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.selectPublications = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.sortPublications = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.searchInput = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.closeSearch = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.showNavigationMenu = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.openUrl = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.changeSortDirectionPublicationList = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.speechHistory = '';
        this.responses_misunderstood = ["Could you repeat that?", "Try again!", "Perhaps you could rephrase that?", "I'm afraid I misunderstood what you were trying to say"];
        this.responses_unknown = ["I'm not sure what you mean?", "I'm sorry, I only have a small vocabulary.", "Sorry, you need to help me out here."];
        this.responses_welcome = ["Hi, what can I help you with?", "Hello, how are you today?", "Hi, nice to see you!", "Welcome, how can I assist?"];
        this.responses_thanks = ["You're welcome", "My pleasure", "Is there anything else I can assist you with?"];
        this.responses_goodbye = ["Goodbye", "Thanks for your visit!", "Hope to see you again!"];
        this.commonSearchWords = ['the', 'it is', 'a', 'an', 'by', 'to', 'get', 'you', 'me', 'your', 'from', 'and', 'show', 'can', 'all', 'could', 'how', 'in', 'with', 'about', 'but', 'at', 'on', 'it', 'i', 'are', 'to', 'for', 'of', 'paper', 'papers', 'publication', 'publications', 'search', 'find', 'select', 'feedback', 'interaction'];
    }
    navigateTo(page) {
        this.link.next(page);
    }
    updateTheme(theme) {
        this.changeTheme.next(theme);
    }
    updateInteractionModality(modality, state) {
        this.updateModality.next({ modality: modality, state: state });
    }
    updatePublicationSelection(type) {
        this.selectPublications.next(type);
    }
    sortPublicationsBy(type) {
        this.sortPublications.next(type);
    }
    search(querry) {
        this.searchInput.next(querry);
    }
    genericMessage() {
        const responseMsg_index = this.getRandomInt(this.responses_welcome.length);
        this.respond(this.responses_welcome[responseMsg_index]);
    }
    respondToUnknownQuery(e) {
        if (e.results[e.results.length - 1][0].confidence < 0.6) {
            const responseMsg_index = this.getRandomInt(this.responses_misunderstood.length);
            this.respond(this.responses_misunderstood[responseMsg_index]);
        }
        else {
            const responseMsg_index = this.getRandomInt(this.responses_unknown.length);
            this.respond(this.responses_unknown[responseMsg_index]);
        }
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    initializeSpeechRecognition() {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            this.supported = true;
            this.utter.onend = () => {
                if (!this.recognizing) {
                    this.recognition.start();
                }
            };
            const { webkitSpeechRecognition } = window;
            const { SpeechRecognition } = window;
            this.recognition = new (webkitSpeechRecognition || SpeechRecognition)();
            this.recognition.continuous = true;
            this.recognition.lang = 'en-GB';
            this.recognition.interimResults = false;
            this.recognition.maxAlternatives = 2;
            this.recognition.onstart = () => {
                this.recognizing = true;
                this.navigatorService.startDetecting();
            };
            this.recognition.onend = () => {
                this.recognizing = false;
                this.navigatorService.stopDetecting();
            };
            this.recognition.onerror = () => {
                this.recognizing = false;
                this.navigatorService.stopDetecting();
            };
            this.recognition.onresult = (e) => {
                let interim_transcript = '';
                interim_transcript = e.results[e.results.length - 1][0].transcript.trim().toLowerCase();
                interim_transcript = interim_transcript.replace(/\./g, '').replace(/\?/g, '');
                this.document.getElementById('speech-output').innerHTML = '';
                this.document.getElementById('speech-input').innerHTML = interim_transcript;
                if (interim_transcript.includes('contact') || interim_transcript.includes('details') || interim_transcript.includes('address')) {
                    this.respond('these are my contact details');
                    this.navigateTo('contact');
                }
                // page navigation
                else if (interim_transcript.includes('teach') || interim_transcript.includes('teaching') || interim_transcript.includes('course')) {
                    this.respond('these are the courses I teach');
                    this.navigateTo('teaching');
                }
                else if (this.config.activePage !== 'publications' && (interim_transcript.includes('publication') || interim_transcript.includes('publications'))) {
                    this.respond('these are my publications');
                    this.navigateTo('publications');
                }
                else if (interim_transcript.includes('home') || interim_transcript.includes('welcome') || interim_transcript.includes('main page')) {
                    this.respond('here is the welcome page');
                    this.navigateTo('/');
                }
                // activate modalities or change dark/light mode
                else if (this.speechHistory === 'activate' || (interim_transcript.includes('turn') && interim_transcript.includes(' on')) || interim_transcript.includes('activate') || interim_transcript.includes('enable')) {
                    this.speechHistory = '';
                    if (interim_transcript.includes('audio') || interim_transcript.includes('sound')) {
                        this.updateInteractionModality('audio', true);
                        this.respond('Audio feedback is turned on');
                    }
                    else if (interim_transcript.includes('haptic') || interim_transcript.includes('touch')) {
                        this.respond('Haptic feedback is turned on');
                        this.updateInteractionModality('haptic', true);
                    }
                    else if (interim_transcript.includes('visual') || interim_transcript.includes('vision')) {
                        this.respond('Visual feedback is turned on');
                        this.updateInteractionModality('vision', true);
                    }
                    else if (interim_transcript.includes('dark') || interim_transcript.includes('night')) {
                        this.respond('Dark mode is turned on');
                        this.updateTheme('dark-mode');
                    }
                    else if (interim_transcript.includes('light')) {
                        this.respond('Light mode is turned on');
                        this.updateTheme('light-mode');
                    }
                    else {
                        this.respond("Sorry, what would you like me to activate?");
                        this.speechHistory = 'activate';
                    }
                }
                // disable modalities or change dark/light mode
                else if (this.speechHistory === 'disable' || interim_transcript.includes('disable') || interim_transcript.includes('deactivate') || (interim_transcript.includes('turn') && interim_transcript.includes('off'))) {
                    this.speechHistory = '';
                    if (interim_transcript.includes('audio') || interim_transcript.includes('sound')) {
                        this.updateInteractionModality('audio', false);
                        this.respond('audio feedback is turned off');
                    }
                    else if (interim_transcript.includes('haptic') || interim_transcript.includes('touch')) {
                        this.respond('haptic feedback is turned off');
                        this.updateInteractionModality('haptic', false);
                    }
                    else if (interim_transcript.includes('voice') || interim_transcript.includes('speech')) {
                        this.respond('voice control is turned off');
                        this.updateInteractionModality('speech', false);
                    }
                    else if (interim_transcript.includes('visual') || interim_transcript.includes('vision')) {
                        this.respond('visual feedback is turned off');
                        this.updateInteractionModality('vision', false);
                    }
                    else if (interim_transcript.includes('dark') || interim_transcript.includes('dark mode') || interim_transcript.includes('night mode')) {
                        this.respond('Dark mode is turned off');
                        this.updateTheme('light-mode');
                    }
                    else if (interim_transcript.includes('light') || interim_transcript.includes('light mode')) {
                        this.respond('Light mode is turned off');
                        this.updateTheme('dark-mode');
                    }
                    else {
                        this.respond("Sorry, what would you like to disable?");
                        this.speechHistory = 'disable';
                    }
                }
                // specific controls
                else if (interim_transcript.includes('dark') || interim_transcript.includes('dark mode') || interim_transcript.includes('night mode')) {
                    this.respond('Dark mode is turned on');
                    this.updateTheme('dark-mode');
                }
                else if (interim_transcript.includes('light') || interim_transcript.includes('light mode')) {
                    this.respond('Light mode is turned on');
                    this.updateTheme('light-mode');
                }
                else if (interim_transcript.includes('menu') || interim_transcript.includes('navigation')) {
                    this.respond('Here you go');
                    this.showNavigationMenu.next();
                }
                else if (interim_transcript.includes('linkedin')) {
                    this.respond('Here you go');
                    this.openUrl.next('linkedin');
                }
                else if (interim_transcript.includes('twitter')) {
                    this.respond('Here you go');
                    this.openUrl.next('twitter');
                }
                else if (interim_transcript.includes('email') || interim_transcript.includes('mail')) {
                    this.respond('Here you go');
                    this.openUrl.next('mail');
                }
                //common responses
                else if ((interim_transcript.includes('what ') || interim_transcript.includes('how ') || interim_transcript.includes('help')) && (interim_transcript.includes('could') || interim_transcript.includes('can'))) {
                    this.respond('You can ask me to navigate, search publications, change interaction modalities, and the like.');
                }
                else if (interim_transcript.includes('hello') || interim_transcript === 'hi') {
                    this.respond("hi!");
                }
                else if (interim_transcript.includes('how are you')) {
                    this.respond("Great, thanks!");
                }
                else if (interim_transcript.includes('goodbye') || interim_transcript.includes('see you') || interim_transcript.includes('bye')) {
                    const responseMsg_index = this.getRandomInt(this.responses_goodbye.length - 1);
                    this.respond(this.responses_goodbye[responseMsg_index]);
                }
                else if (interim_transcript.includes('good') || interim_transcript.includes('fine') || interim_transcript.includes('great')) {
                    this.respond('awesome');
                }
                else if (interim_transcript.includes('thank you') || interim_transcript.includes('thanks')) {
                    const responseMsg_index = this.getRandomInt(this.responses_thanks.length - 1);
                    this.respond(this.responses_thanks[responseMsg_index]);
                }
                else if ((interim_transcript.includes('not') || interim_transcript.includes("wasn't")) && interim_transcript.includes('talking') && interim_transcript.includes('you')) {
                    this.respond('my apologies');
                }
                else if (interim_transcript.includes('awesome')) {
                    this.respond("indeed!");
                }
                else if (interim_transcript === 'yes' || interim_transcript === 'no' || interim_transcript === 'nothing') {
                    this.speechHistory = '';
                    this.respond("Okay");
                }
                else if (interim_transcript === 'ok' || interim_transcript === 'okay' || interim_transcript === 'nevermind' || interim_transcript.includes('no worries') || (interim_transcript.includes('never') && interim_transcript.includes('mind'))) {
                    this.speechHistory = '';
                    this.respond("Okay");
                }
                else if (interim_transcript === 'sure') {
                    this.respond("Thanks");
                }
                else if (interim_transcript === 'shut up') {
                    if (this.config.modalities[2].active) {
                        this.updateInteractionModality('audio', false);
                        this.respond('Okay, I turned off all audio feedback.');
                    }
                    else {
                        this.updateInteractionModality('speech', false);
                    }
                }
                else if (interim_transcript.includes('***')) {
                    this.respond("If you dislike the voice interface, you can always turn it off.");
                }
                // respond to search queries
                else if (this.config.activePage === 'publications') {
                    if (interim_transcript.includes('search') || interim_transcript.includes('find') || interim_transcript.includes('select') || interim_transcript.includes('get') || interim_transcript.includes('show')) {
                        const uncommonWords = this.getUncommon(interim_transcript, this.commonSearchWords);
                        if (interim_transcript.includes('search') && (interim_transcript.includes('close') || interim_transcript.includes('cancel') || interim_transcript.includes('stop'))) {
                            this.closeSearch.next();
                        }
                        else if (interim_transcript === 'show all publications' || interim_transcript === 'show all papers') {
                            this.respond('this is a complete overview of my publications');
                            this.updatePublicationSelection('all');
                        }
                        else if (uncommonWords.length > 0) {
                            this.search(uncommonWords.join(' '));
                        }
                        else {
                            this.respondToUnknownQuery(e);
                        }
                    }
                    else if (interim_transcript.includes('sort')) {
                        if (interim_transcript.includes('date')) {
                            this.sortPublicationsBy('date');
                            this.respond('the items are sorted by date');
                        }
                        else if (interim_transcript.includes('title')) {
                            this.sortPublicationsBy('title');
                            this.respond('the items are sorted by publication title');
                        }
                        else if (interim_transcript.includes('citations')) {
                            this.sortPublicationsBy('citations');
                            this.respond('the items are sorted by citations');
                        }
                        else {
                            this.respondToUnknownQuery(e);
                        }
                    }
                    else if ((interim_transcript.includes('direction') || interim_transcript.includes('order')) && (interim_transcript.includes('change') || interim_transcript.includes('reverse'))) {
                        this.changeSortDirectionPublicationList.next();
                        this.respond('here you go');
                    }
                    else if (interim_transcript.includes('conference papers')) {
                        this.respond('these are all the conference papers');
                        this.updatePublicationSelection('conference paper');
                    }
                    else if (interim_transcript.includes('book chapters') || interim_transcript.includes('journal articles')) {
                        this.respond('these are all the book chapters and journal articles');
                        this.updatePublicationSelection('journal');
                    }
                    else if (interim_transcript.includes('magazine')) {
                        this.respond('these are all the magazine articles');
                        this.updatePublicationSelection('magazine articles');
                    }
                    else if (interim_transcript.includes('book chapters') || interim_transcript.includes('journal articles')) {
                        this.respond('these are all the book chapters and journal articles');
                        this.updatePublicationSelection('journal');
                    }
                    else if (interim_transcript.includes('workshops') || interim_transcript.includes('workshop')) {
                        this.respond('these are all the workshop papers');
                        this.updatePublicationSelection('workshop');
                    }
                    else if (interim_transcript.includes('thesis') || interim_transcript.includes('dissertation')) {
                        this.respond('this is my thesis');
                        this.updatePublicationSelection('thesis');
                    }
                    else if (interim_transcript.includes('all publications') || interim_transcript.includes('all papers')) {
                        this.respond('this is a complete overview of my publications');
                        this.updatePublicationSelection('all');
                    }
                    else {
                        this.respondToUnknownQuery(e);
                    }
                }
                else if (this.config.activePage === 'welcome') {
                    if (interim_transcript.includes('scroll') || interim_transcript.includes('project')) {
                        if (interim_transcript.includes('down') || interim_transcript.includes('project')) {
                            this.document.getElementById('page-wrapper').scrollTop = window.innerHeight;
                            this.respond('here you go');
                        }
                        else if (interim_transcript.includes('up')) {
                            window.scrollTo(0, 0);
                            this.respond('here you go');
                        }
                    }
                    else {
                        this.respondToUnknownQuery(e);
                    }
                }
                else if (interim_transcript !== '') {
                    this.respondToUnknownQuery(e);
                }
            };
            this.recognition.start();
            this.genericMessage();
            this.navigatorService.initializeAudioDetection();
        }
        else {
            this.supported = false;
            this.noBrowserSupportMSG();
            setTimeout(() => {
                this.updateInteractionModality('speech', false);
            }, 3000);
        }
    }
    noBrowserSupportMSG() {
        this.navigatorService.showMessage('Sorry, your browser does not support speech recognition.');
    }
    restartSpeechRecognition() {
        if (!this.recognizing && this.recognition) {
            this.recognition.start();
        }
    }
    respond(text) {
        if (this.recognition) {
            if (this.config.modalities[2].active) {
                this.recognition.stop();
                this.utter.text = text;
                this.synth.speak(this.utter);
            }
            this.document.getElementById('speech-output').innerHTML = text;
            clearTimeout(this.clearInputField);
            this.clearInputField = setTimeout(() => {
                this.document.getElementById('speech-input').innerHTML = '';
            }, 5000);
            clearTimeout(this.clearOutputField);
            this.clearOutputField = setTimeout(() => {
                this.document.getElementById('speech-output').innerHTML = '';
            }, 5000);
        }
    }
    getUncommon(sentence, common) {
        let wordArr = sentence.match(/\w+/g);
        let commonObj = {};
        let uncommonArr = [];
        let word;
        let i;
        for (i = 0; i < common.length; i++) {
            commonObj[common[i].trim()] = true;
        }
        for (i = 0; i < wordArr.length; i++) {
            word = wordArr[i].trim().toLowerCase();
            if (!commonObj[word]) {
                uncommonArr.push(word);
            }
        }
        return uncommonArr;
    }
    disableSpeechRecognition() {
        if (this.supported) {
            this.recognition.abort();
        }
        this.recognizing = false;
        clearTimeout(this.clearInputField);
        clearTimeout(this.clearOutputField);
        this.navigatorService.disconnectAudioListener();
    }
    activateSpeechRecognition() {
        if (this.supported) {
            if (!this.recognizing) {
                this.recognition.start();
            }
            else {
                this.recognition.stop();
            }
        }
        else {
            this.noBrowserSupportMSG();
        }
    }
}
VoiceControlService.ɵfac = function VoiceControlService_Factory(t) { return new (t || VoiceControlService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_navigator_service__WEBPACK_IMPORTED_MODULE_3__["NavigatorService"])); };
VoiceControlService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: VoiceControlService, factory: VoiceControlService.ɵfac });


/***/ }),

/***/ "z1sW":
/*!********************************************!*\
  !*** ./src/app/services/cursor.service.ts ***!
  \********************************************/
/*! exports provided: CursorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CursorService", function() { return CursorService; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class CursorService {
    constructor(document) {
        this.document = document;
    }
    moveCursor(x, y, hover) {
        this.document.getElementById('cursor').classList.add('is-moving');
        if (hover) {
            this.document.getElementById('cursor').classList.add('highlight');
        }
        else if (!hover) {
            this.document.getElementById('cursor').classList.remove('highlight');
        }
        this.document.getElementById('cursor').style.top = y + 'px';
        this.document.getElementById('cursor').style.left = x + 'px';
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            if (this.document.getElementById('cursor') && this.document.getElementById('cursor').classList.contains('is-moving')) {
                this.document.getElementById('cursor').classList.remove('is-moving');
            }
        }, 250);
    }
    moveImage(x, y) {
        this.document.getElementById('image-cursor').style.top = y + 'px';
        this.document.getElementById('image-cursor').style.left = (x + (window.innerWidth * 0.1)) + 'px';
    }
    showCursorHighlight() {
        this.document.getElementById('cursor').classList.add('highlight');
    }
    hideCursorHighlight() {
        this.document.getElementById('cursor').classList.remove('highlight');
    }
}
CursorService.ɵfac = function CursorService_Factory(t) { return new (t || CursorService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"])); };
CursorService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CursorService, factory: CursorService.ɵfac });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map